import TransactionItem from "@/components/TransactionItem";
import Link from "next/link"
import { useEffect, useState } from "react";

function HomeRecentTransactions({userInfo, banksList}: HomeHeaderProps) {

    const [transactionsList, setTransactionsList] = useState([]);
    
    const prepareTransactions = () => {
        const data = [];
        for(let bank of banksList) {
            if(JSON.parse(bank.transactions).length) {
                for (let transaction of JSON.parse(bank.transactions)) {
                    data.push(transaction);
                }
            }
        }
        setTransactionsList([...data]);
    }
    
    useEffect(() => {
      prepareTransactions()
    }, [banksList])


    return (
        
        <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between">
                <span className="text-20 md:text-24 font-semibold text-gray-900 text-b&w block">
                    Recent Transactions
                </span>
                <Link href='/transaction-history' className="text-14 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 text-b&w">
                    View all
                </Link>
            </div>

            {
                transactionsList.length
                ?
                    transactionsList.map(item => {
                        return (
                            <div key={item.transaction_id}>
                                <TransactionItem 
                                    transaction={item}
                                />
                            </div>
                        )
                    })
                :
                    <span className="text-gray-500 text-b&w">
                        There are no transactions from the last year.
                    </span>
            }
        </div>
    )
}

export default HomeRecentTransactions