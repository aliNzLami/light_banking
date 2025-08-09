'use client'

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

// componets
import HomeHeader from "./home/HomeHeader"
import RightSidebar from "./home/rightSidebar/RightSidebar"
import { get_bankItems_plaid } from "@/lib/actions/users.actions";
import { useState } from "react";

// flowchart:


function Home() {
    
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const userInfo = useSelector((state: RootState) => state.userInfo.value);

    const checkBalance = () => {
        let sum = 0
        // if(banksList.length)
        // for(let bank of banksList) {
        //     for (let account of JSON.parse(bank.accountsList)) {
        //         sum = sum + account.balances.current
        //     }
        // }
        return sum;
    }

    return (
        <section className="flex w-full flex-row">
            <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
                <HomeHeader 
                    userInfo={userInfo}
                    banksList={banksList}
                    totalBalance={checkBalance()}
                />
                RECENT TRANSACTIONS
            </div>
            <RightSidebar 
                userInfo={userInfo}
                banksList={banksList}
            />
        </section>
    )
}

export default Home
