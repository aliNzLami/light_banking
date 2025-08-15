'use client'
import Modal from "@/components/Modal"
import { capitalizeFirstLetter } from "@/lib/utils"
import { useState } from "react";

function CardModal({showModal, onClose, data, deleteCard}: BankCardMoadlProps ) {

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
    
    return (
            <Modal 
                isOpen={showModal}
                onClose={onClose}
            >

                <Modal isOpen={ensureModal} onClose={() => setEnsureModal(false)}>
                    <div className="flex flex-col justify-center">
                        <span className="text-center mt-5 mb-10 text-[20px] leading-[24px] font-semibold text-gray-700 text-b&W">
                            Are you sure you want to delete {account?.name??""} ?
                        </span>

                        <button onClick={() => handleDelete(data)} className="mt-10 cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            DELETE
                        </button>
                    </div>
                </Modal>


                <div className="flex flex-col justify-center">
                <span className="text-center mt-5 mb-10 text-[20px] leading-[24px] font-semibold text-gray-700 text-b&W">
                    {account?.name??""}
                </span>

                {
                    Object.keys(cardInfo).map(item => {
                        return (
                            <div key={item}>
                                <span className="font-semibold">
                                    { `${item}: ` }
                                </span>
                                <span>
                                    { cardInfo[item] }
                                </span>
                            </div>
                        )
                    })
                }

                <div className="flex justify-center">
                    <div className="w-[150px]">
                        <button onClick={() => setEnsureModal(true)} className="mt-10 cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            DELETE CARD 
                        </button>
                    </div>
                </div>

                </div>
            </Modal>
  )
}

export default CardModal