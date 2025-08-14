import BankCard from '@/components/BankCard'
import React from 'react'

function MyBanksList({banksList, onClickCard}: {banksList: array, onClickCard: Function}) {
    return (
        <>
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