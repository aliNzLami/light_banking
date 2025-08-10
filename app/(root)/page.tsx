'use client'

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

// componets
import HomeHeader from "./home/HomeHeader"
import RightSidebar from "./home/rightSidebar/RightSidebar"
import HomeRecentTransactions from "./home/HomeRecentTransactions";

// flowchart:


function Home() {
    
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const userInfo = useSelector((state: RootState) => state.userInfo.value);

    return (
        <section className="flex w-full flex-row">
            <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
                <HomeHeader 
                    userInfo={userInfo}
                    banksList={banksList}
                />
                <HomeRecentTransactions 
                    userInfo={userInfo}
                    banksList={banksList}
                />
            </div>
            <RightSidebar 
                userInfo={userInfo}
                banksList={banksList}
            />
        </section>
    )
}

export default Home
