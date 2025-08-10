'use client'

// components
import HeaderTitle from '@/components/HeaderTitle'
import TotalBalance from './TotalBalance'


function HomeHeader({userInfo, banksList}: HomeHeaderProps) {
  
  return (
    <header className="flex flex-col justify-between gap-8">

        <HeaderTitle
            text1={"Hello"}
            text2={userInfo?.name??""}
            description="Accese and manage your transactions efficiently"
        />

        <TotalBalance banksList={banksList}/>
    </header>
  )
}

export default HomeHeader