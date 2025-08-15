import BankCard from '@/components/BankCard'
import React from 'react'

function MyBanksList({banksList, onClickCard}: {banksList: array, onClickCard: Function}) {
    return (
        <>
            <h2 className="text-[24px] leading-[30px] font-bold block text-b&w text-center bankListHeader">
                All Bank Accounts List
            </h2>
            <span className="text-[14px] block text-gray-500 text-b&w text-center mt-3">
                You can see the details and delete any of them.
            </span>

            <div className="flex flex-col items-center mt-8">
            {
                banksList.map(bank => {
                return(
                    <>
                    <div key={bank.$id}>
                        {
                        JSON.parse(bank.accountsList).map((account, index) => {
                            return (
                            <div key={index} className="mb-3" onClick={() => onClickCard({account, bank})}>
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
        </>
    )
}

export default MyBanksList