'use client'
import { useState } from "react";

// helper
import { capitalizeFirstLetter } from "@/lib/utils"

// redux
import { useDispatch, useSelector } from "react-redux";
import { setAccountTransfer, setBankHistory } from "@/lib/redux/transactionSlice";

// modal
import Modal from "@/components/Modal"
import { redirect } from "next/navigation";


function CardModal({showModal, onClose, data, deleteCard}: BankCardMoadlProps ) {

    const dispatch = useDispatch();
    const { account, bank } = data;
    const cardInfo = {
        "Official Name": account?.official_name??"", 
        "Institution": bank?.institution??"" ? JSON.parse(bank.institution).institution.name : "" ,
        "Type": account?.type??"" ? capitalizeFirstLetter(account.type) : "", 
        "Subtype": account?.subtype??"" ? capitalizeFirstLetter(account.subtype) : "", 
        "Balance": `$${account?.balances?.current??"" ? account.balances.current : 0}`, 
        "Card Number": account?.mask??"" ? `**** **** **** ${account.mask}` : "", 
    }
    const [ensureModal, setEnsureModal] = useState(false);

    const handleDelete = (data: Object) => {
        setEnsureModal(false);
        onClose();
        deleteCard(data);
    }

    const goToTransactions = () => {
        dispatch(setBankHistory(bank));
        redirect('/transaction-history')
    }

    const goToTransfer = () => {
        dispatch(setAccountTransfer({bank, account}));
        redirect('/transfer-funds')
    }
    
    return (
            <Modal 
                isOpen={showModal}
                onClose={onClose}
            >

                <Modal isOpen={ensureModal} onClose={() => setEnsureModal(false)}>
                    <div className="flex flex-col justify-center">
                        <span className="text-center mt-5 mb-10 text-[20px] leading-[24px] font-semibold text-gray-700 txt-darkMode">
                            Are you sure you want to delete {account?.name??""} ?
                        </span>

                        <button onClick={() => handleDelete(data)} className="mt-10 cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            DELETE
                        </button>
                    </div>
                </Modal>


                <div className="flex flex-col justify-center">
                <span className="text-center mt-5 mb-10 text-[20px] leading-[24px] font-semibold text-gray-700 txt-darkMode">
                    {account?.name??""}
                </span>

                {
                    Object.keys(cardInfo).map(item => {
                        return (
                            <div key={item}>
                                <span className="font-semibold txt-darkMode">
                                    { `${item}: ` }
                                </span>
                                <span className="txt-darkMode">
                                    { cardInfo[item] }
                                </span>
                            </div>
                        )
                    })
                }

                <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline">
                    <div className="w-[100%] md:w-[150px]">
                        <button onClick={() => setEnsureModal(true)} className="w-[100%] mt-10 cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Delete Card
                        </button>
                    </div>
                    <div className="w-[100%] md:w-[180px] md:mx-3">
                        <button onClick={goToTransactions} className="w-[100%] mt-3 cursor-pointer focus:outline-none text-primary-panel border-primary-panel darkModeTransactionsBtn focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Transactions List
                        </button>
                    </div>
                    <div className="w-[100%] md:w-[180px]">
                        <button onClick={goToTransfer} className="w-[100%] mt-3 cursor-pointer focus:outline-none text-white bg-primary-panel darkModeTransferBtn focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Transfer Funds
                        </button>
                    </div>
                </div>

                </div>
            </Modal>
  )
}

export default CardModal