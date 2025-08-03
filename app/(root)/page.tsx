import HomeHeader from "./HomeHeader"

function Home() {
  return (
      <section className="flex w-full flex-row">
          <div className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12">
              <HomeHeader />
          </div>
        </section>
  )
}

export default Home
