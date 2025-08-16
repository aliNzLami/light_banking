'use client'

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setLinkToken, setBanks } from "@/lib/redux/bankSlice";
import { setPageLoading } from "@/lib/redux/loadingSlice";
import { createBank_API, deleteBank_API, getBanks_API } from "@/lib/actions/users.actions";
import { redirect } from "next/navigation";
import { getFormattedDate } from "@/lib/utils";

function ReviewTransfer({data, submit, goBack}: {data: object, submit: Function, goBack: Function}) {

    const dispatch = useDispatch();
    
    const content = {
        "Your Bank Institution:": data?.step1?.bank?.institution ? JSON.parse(data?.step1?.bank?.institution).institution?.name??"" : "",
        "Your Account Type:": data?.step1?.account?.name??"",
        "Your Note:": data?.step1?.additionalInfo??"",
        "Receiever's Email:": data?.step2?.email??"",
        "Receiever's Public Plaid Serial:": data?.step2?.publicID??"",
        "Amount of Money:": `$${data?.step2?.amount??""}`,
    }

    const prepareData = () => {
        const { accessToken, itemID, userID, userName, $id } = data?.step1?.bank;
        const institution = JSON.parse(data?.step1?.bank.institution).institution;
        const accounts = JSON.parse(data?.step1?.bank.accountsList);
        let transactions;
        if(data?.step1?.bank.transactions) {
            transactions = [ ...JSON.parse(data?.step1?.bank.transactions) , {...content, "Date:": getFormattedDate()}]
        }
        else {
            transactions = [{...content, "Date:": getFormattedDate()}]
        }
        transactions = JSON.stringify(transactions);

        return { accessToken, itemID, userID, userName, $id, institution, accounts, transactions }
    }

    const calculateBalance = () => {
        const allData = prepareData();
        allData.accounts.map(item => {
            if(item.name === data.step1.account.name) {
                item.balances.current = item.balances.current - data.step2.amount
            }
        })
        transferFund(allData)
    }

    

    const transferFund = async (allData: object) => {
        const { accessToken, itemID, userID, userName, $id, institution, accounts, transactions } = allData;
        dispatch(setPageLoading(true));

        await deleteBank_API($id)
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
        getBanks_API(data?.step1?.bank.userID)
        .then(res => {
            if(res?.total != 0) {
                dispatch(setBanks(res?.documents))
                dispatch(setPageLoading(false));
                redirect('/')
            }
        })
        .catch(err => {
        // setIsLoading(false);
        })
    }


    return (
        <>
            <div className="grid recieverFundGrid">
                {
                    Object.keys(content).map(item => {
                        return (
                        <>
                            <div key={item}>
                                <span className="text-[16px] leading-[24px] font-bold text-gray-700 block txt-darkMode text-center md:text-start blueText">
                                    { item }
                                </span>
                            </div>

                            <span className="txt-darkMode text-center md:text-start" key={content[item]}>
                                { content[item] }
                            </span>
                        </>
                        )
                    })
                }
            </div>


            <div className="flex md:justify-between flex-col md:flex-row mt-15">
                <div className="w-[100%] md:w-[130px]">
                    <button 
                        className={`w-[100%] mb-5 md:mb-0 text-primary-panel border-primary-panel py-2 rounded py-2 px-3 cursor-pointer previousBtnDarkMode`} 
                        onClick={goBack}
                    >
                        Previous
                    </button>
                </div>

                <div className="w-[100%] md:w-[130px]">
                    <button 
                        className={`primaryButton py-2 rounded`} 
                        onClick={calculateBalance}
                    >
                        Transfer Fund
                    </button>
                </div>
            </div>
        </>
    )
}

export default ReviewTransfer