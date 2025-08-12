'use client'

// hooks
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { usePlaidLink } from 'react-plaid-link';

// api
import { createBank_API, get_accessToken_plaid, get_linkToken_plaid, getBanks_API } from "@/lib/actions/users.actions";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setLinkToken, setAccessToken, setBanks } from "@/lib/redux/bankSlice";
import SubmitBtn from "@/components/SubmitBtn";
import BankCard from "@/components/BankCard";
import LoadingPage from "@/components/LoadingPage";

function MyBanks() {

  const dispatch = useDispatch();
      const linkToken = useSelector((state: RootState) => state.bankInfo.linkToken);
      const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
      const userInfo = useSelector((state: RootState) => state.userInfo.value);
      const [isLoading, setIsLoading] = useState(false);
      const [showList, setShowList] = useState([]);
        
      const handleClick = async () => {
        setIsLoading(true);
        const handler = window.Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken, metadata) => {
            const response = await get_accessToken_plaid(publicToken);
            createBank({...response}, metadata.institution)
          },
          onExit: (err, metadata) => {
            console.log(err);
            console.log(metadata);
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

      const updateList = () => {
        setTimeout(() => {
          getBanks_API(userInfo.$id)
          .then(res => {
            if(res?.total != 0) {
              console.log(res?.documents);
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

    useEffect(() => {
      if(!linkToken) {
        fetchLinkToken();
      }
    }, [])

    useEffect(() => {
      setShowList([...banksList])
    }, [banksList])
    

    console.log(banksList);
    

    return (
      <>
        {
          isLoading
          ?
            <LoadingPage />
          :
          <section className="p-10">
            <h1 className="text-[26px] leading-[32px] font-bold text-center md:text-start">
              Your Bank Accounts
            </h1>
            <span className="text-[18px] leading-[22px] font semibold block text-gray-600 text-b&w mt-3 text-center md:text-start">
              All details of your bank accounts. Add your banks, transfer fast.
            </span>

            <div>
              <div className="md:w-[150px]">
                <SubmitBtn 
                  buttonText={'Add Bank'}
                  onClick={handleClick}
                  isLoading={false}
                />
              </div>

              <h2 className="text-[24px] leading-[30px] font-bold block text-b&w mt-15 md:mt-1 text-center">
                Your List
              </h2>

              <div className="flex flex-col items-center mt-5">
                {
                  banksList.map(bank => {
                    return(
                      <>
                        <div key={bank.$id}>
                          {
                            JSON.parse(bank.accountsList).map((account, index) => {
                              return (
                                <div key={account.account_id} className="mb-3">
                                  <BankCard
                                      bankInfo={bank}
                                      accountNumber={index}
                                  />
                                </div>
                              )
                            })
                          }
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </section>
        }
      </>
    )
}

export default MyBanks