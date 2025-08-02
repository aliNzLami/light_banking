import CountUpAnimate from "./CountUpAnimate"
import DoughnutChart from "./DoughnutChart"

function TotalBalance({accounts, banks, balance}: TotalBalanceProps) {
  return (
    <div className="flex align-center justify-center md:justify-start w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
        <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
            <DoughnutChart accounts={accounts} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[18px] leading-[22px] font-semibold text-gray-900 text-center">
            Bank Accounts: { banks }
          </h2>
          <div className="flex flex-col align-center gap-2">
            <p className="text-[14px] leading-[20px] font-medium text-gray-600">
              Total Currewnt Balance
            </p>
            <div className="flex-center text-[24px] leading-[30px] lg:text-30 flex-1 font-semibold text-gray-900 gap-2">
              $ <CountUpAnimate number={balance} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default TotalBalance