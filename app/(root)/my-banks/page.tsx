'use client'

// hooks
import { useEffect, useState } from "react";

// api
import { createBank_API, deleteBank_API, get_accessToken_plaid, get_linkToken_plaid, getBanks_API } from "@/lib/actions/users.actions";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setLinkToken, setBanks } from "@/lib/redux/bankSlice";

// components
import LoadingPage from "@/components/LoadingPage";
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
      const [isLoading, setIsLoading] = useState(false);
      const [showModal, setShowModal] = useState({
        show: false,
        data: {}
      });
        

      // ------------------------------ FUNCTIONS ------------------------------ //
      const addBankClick = async () => {
        setIsLoading(true);
        const handler = window.Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken, metadata) => {
            const response = await get_accessToken_plaid(publicToken);
            createBank({...response}, metadata.institution)
          },
          onExit: (err, metadata) => {
            setIsLoading(false);
          },
        })
        handler.open();
        handler.exit();
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
              setIsLoading(false);
          })
      }

      const deleteOnClick = (data: Object) => {
        const { bank, account } = {...data};
        const newBank = {...bank};

        const allAccounts = JSON.parse(bank.accountsList);
        const newAccounts = allAccounts.filter(item => item.account_id != account.account_id);
        newBank.accountsList = JSON.stringify([...newAccounts]);

        if(newAccounts.length) {
          deleteAccount(newBank, "deletedAccount");
        }
        else {
          deleteAccount(newBank, "deletedBank");
        }
        setIsLoading(true);
      }

      const deleteAccount = (bank: object, type: string) => {
          deleteBank_API(bank.$id)
          .then(res => {
            if(type === "deletedAccount") {
              updateBanks(bank);
            }
            else {
              window.location.reload();
            }
          })
          .catch(err => {
            setIsLoading(false);
          })
      }

      const updateBanks = (bank: object) => {
        const { accessToken, itemID, userID, userName } = bank;
        const institution = JSON.parse(bank.institution).institution;
        const accounts = JSON.parse(bank.accountsList);

        createBank_API(
          {
            accessToken,
            itemID,
            userID,
            userName,
            institution,
          },
          accounts
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
              setIsLoading(false);
            }
          })
          .catch(err => {
            setIsLoading(false);
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
        {
          isLoading
          ?
            <LoadingPage />
          :
          <section className="p-10">
              <MyBanksHeader 
                handleClick={addBankClick}
              />
              <MyBanksList 
                banksList={banksList}
                onClickCard={(data) => setShowModal({show: true, data })}
              />
          </section>
        }
      </>
    )
}

export default MyBanks