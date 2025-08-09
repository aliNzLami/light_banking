'use client'

// components
import HeaderTitle from '@/components/HeaderTitle'
import TotalBalance from './TotalBalance'


function HomeHeader({userInfo, banksList, totalBalance}: HomeHeaderProps) {
  
  return (
    <header className="flex flex-col justify-between gap-8">

        <HeaderTitle
            text1={"Hello"}
            text2={userInfo?.name??""}
            description="Accese and manage your transactions efficiently"
        />

        <TotalBalance
            accounts={[]}
            banks={banksList.length}
            balance={totalBalance}
        />
    </header>
  )
}

export default HomeHeader