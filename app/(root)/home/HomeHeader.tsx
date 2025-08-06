'use client'

import HeaderTitle from '@/components/HeaderTitle'
import TotalBalance from './TotalBalance'
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

function HomeHeader() {

  const userInfo = useSelector((state: RootState) => state.userInfo.value);
  
  return (
    <header className="flex flex-col justify-between gap-8">

        <HeaderTitle
            title={`Hello ${userInfo?.name??""}`}
            description="stdfsdfsdfsdfsdfsdfsdfsdfsdfsdh"
        />

        <TotalBalance
            accounts={[]}
            banks={1}
            balance={1250}
        />
    </header>
  )
}

export default HomeHeader