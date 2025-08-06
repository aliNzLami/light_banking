import HeaderTitle from '@/components/HeaderTitle'
import TotalBalance from './TotalBalance'

function HomeHeader() {
  return (
    <header className="flex flex-col justify-between gap-8">

        <HeaderTitle
            title="Hello"
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