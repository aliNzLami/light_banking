import HeaderTitle from "@/components/HeaderTitle"
import TotalBalance from "@/components/TotalBalance"

function Home() {
  return (
    <div>
      <section className="flex w-full flex-row">
        <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
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
          </div>
        </section>
    </div>
  )
}

export default Home
