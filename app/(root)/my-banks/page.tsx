'use client'

// hooks
import { useEffect, useState } from "react";

// api
import { createBank_API, deleteBank_API, get_accessToken_plaid, get_linkToken_plaid, getBanks_API } from "@/lib/actions/users.actions";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setLinkToken, setBanks } from "@/lib/redux/bankSlice";
import { setPageLoading } from "@/lib/redux/loadingSlice";

// components
import MyBanksHeader from "./MyBanksHeader";
import MyBanksList from "./MyBanksList";
import CardModal from "./CardModal";

function MyBanks() {

  
      // ------------------------------ REDUX ------------------------------ //
      const dispatch = useDispatch();
      const linkToken = useSelector((state: RootState) => state.bankInfo.linkToken);
      const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
      const userInfo = useSelector((state: RootState) => state.userInfo.value);


      // ------------------------------ STATE ------------------------------ //
      const [showModal, setShowModal] = useState({
        show: false,
        data: {}
      });
        

      // ------------------------------ CREATE FUNCTIONS ------------------------------ //
      const addBankClick = async () => {
        dispatch(setPageLoading(true));
        const handler = window.Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken, metadata) => {
            const response = await get_accessToken_plaid(publicToken);
            checkExistingBank({...response}, metadata.institution, metadata.accounts)
            // createBank({...response}, metadata.institution)
          },
          onExit: (err, metadata) => {
            dispatch(setPageLoading(false));
          },
        })
        handler.open();
        handler.exit();
      }

      const checkExistingBank = (tokens: object, institution: object, accounts: array) => {
        let existedBank = {};
        banksList.map(item => {
          if( JSON.parse(item.institution).institution.name === institution.name ) {
            existedBank = ({...item});
            existedBank.accountsList = [...JSON.parse(existedBank.accountsList), ...accounts];
          }
        })

        if(Object.keys(existedBank).length) {
          organiseNewBankAccounts(tokens, existedBank);
        }
        else {
          createBank(tokens, institution)
        }
      }

      const organiseNewBankAccounts = (token: string, existedBank: object) => {
        const data = existedBank.accountsList;
        const cleanID = data.map(item => {
          const newItem = {...item};
          if ('id' in newItem) {
            newItem['account_id'] = newItem['id'];
            delete newItem['id'];
          }
          return newItem;
        });

        // 2. Remove duplicates based on 'account_id'
        const removedRepeatedItem = new Map();
        cleanID.forEach(item => {
          if (!removedRepeatedItem.has(item.name)) {
            removedRepeatedItem.set(item.name, item);
          }
        });
        const uniqueData = Array.from(removedRepeatedItem.values());
        existedBank.accountsList = uniqueData;
        refreshBankAccounts(existedBank)
      }

      const createBank = (tokens: object, institution: object) => {
          createBank_API({
              accessToken: tokens?.access_token,
              itemID: tokens?.item_id,
              userID: userInfo.$id,
              userName: userInfo.name,
              institution,
          })
          .then(res => {
            updateList()
          })
          .catch(err => {
              dispatch(setPageLoading(false));
          })
      }


      // ------------------------------ DELETE FUNCTIONS ------------------------------ //
      const deleteOnClick = (data: Object) => {
        const { bank, account } = {...data};
        const newBank = {...bank};
        const allAccounts = JSON.parse(bank.accountsList);
        let allTransactions = JSON.parse(bank.transactions);

        // delete accounts
        const newAccounts = allAccounts.filter(item => item.account_id != account.account_id);
        newBank.accountsList = JSON.stringify([...newAccounts]);
        
        // delete transactions
        if(allTransactions) {
          const newObj = [];
          allTransactions.map(item => {
            if(item['Your Account Type:'] !== account.name ) {
              newObj.push(item);
            }
          })
          if(newObj.length) {
            newBank.transactions = JSON.stringify([...newObj]);
          }
          else {
            newBank.transactions = null
          }
        }

        // call API
        if(newAccounts.length) {
          deleteBankAccount(newBank, "deletedAccount");
        }
        else {
          deleteBankAccount(newBank, "deletedBank");
        }
        dispatch(setPageLoading(true));
      }

      const deleteBankAccount = async (bank: object, type: string) => {
        if(type === "deletedAccount") {
          bank.accountsList = JSON.parse(bank.accountsList);
          refreshBankAccounts(bank);
        }
        else {
          await deleteBank_API(bank.$id)
          .then(res => {
            if(banksList.length === 1) {
              window.location.reload()
            }
            else {
              updateList()
            }
          })
          .catch(err => {
            console.log(err);            
          })
        }
      }

      // ------------------------------ SHOWING LIST FUNCTIONS ------------------------------ //
      
      const refreshBankAccounts = async (bank: object) => {
        const { accessToken, itemID, userID, userName, $id, transactions } = bank;
        const institution = JSON.parse(bank.institution).institution;
        const accounts = bank.accountsList;
        
        await deleteBank_API($id)
        .then(res => {

        })
        .catch(err => {
          console.log(err);
        })

        await createBank_API(
          { accessToken, itemID, userID, userName, institution, transactions }, accounts
        )
        .then(res => {
          updateList();
        })
        .catch(err => {
          console.log(err);
        })
      }
      
      const updateList = () => {
        setTimeout(() => {
          getBanks_API(userInfo.$id)
          .then(res => {
            if(res?.total != 0) {
              dispatch(setBanks(res?.documents))
              dispatch(setPageLoading(false));
            }
          })
          .catch(err => {
            // setIsLoading(false);
          })
        }, 10000);
      }

      const fetchLinkToken = async () => {
          await get_linkToken_plaid(userInfo, ['auth', 'transactions', 'identity'])
          .then(res => {
              dispatch(setLinkToken(res.linkToken));
          })
      }


      // ------------------------------ EFFECTS ------------------------------ //
      useEffect(() => {
        if(!linkToken) {
          fetchLinkToken();
        }
      }, [])

    return (
      <>
        <CardModal 
          showModal={showModal.show}
          onClose={() => setShowModal({show: false, data: {}})}
          data={showModal.data}
          deleteCard={(data) => deleteOnClick(data)}
        />
        <section className="custom_container">
          <div className="p-10">
            <MyBanksHeader 
              handleClick={addBankClick}
            />
            <MyBanksList 
              banksList={banksList}
              onClickCard={(data) => setShowModal({show: true, data })}
            />
          </div>
        </section>
      </>
    )
}

export default MyBanks