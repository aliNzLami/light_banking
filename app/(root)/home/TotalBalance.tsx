import CountUpAnimate from "@/components/CountUpAnimate"
import DoughnutChart from "@/components/DoughnutChart"
import { useEffect } from "react";

function TotalBalance({banksList}: object) {

  // console.log(JSON.parse(banksList.accountsList));
  
  const calculateBalance = () => {
    let sum = 0;
    for(let bank of banksList) {
      for(let account of JSON.parse(bank.accountsList)) {
        sum = sum + (account?.balances?.current??"" ? account.balances.current : 0)
      }
    }
    return sum;
  }

  const prepareChartData = () => {
      const data = { 
        datasets: [ 
            {
                label: `${banksList.length > 1 ? "Banks" : `${JSON.parse(banksList[0].institution).institution.name} Accounts` }`,
                data: [],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],
        labels: []
      }

      if(banksList.length > 1) {
        for(let bank of banksList) {
          for(let account of JSON.parse(bank.accountsList)) {
            data.datasets[0].data.push(account?.balances?.current??"")
            data.labels.push(JSON.parse(bank.institution).institution.name)
          }
        }
      }
      else {
        const accounts = JSON.parse(banksList[0].accountsList);
        for(let account of accounts) {
          data.datasets[0].data.push(account?.balances?.current??"")
          data.labels.push(account.name)
        }
      }
      return data;
  }

  console.log(banksList);
  

  return (
    <div className="flex align-center justify-center md:justify-start w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-md sm:gap-6 sm:p-6">
        <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
            <DoughnutChart data={ prepareChartData() } />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[18px] leading-[22px] font-semibold text-gray-900">
            <span>
              {`${banksList.length > 1 ? "All Banks:" : `${JSON.parse(banksList[0].institution).institution.name} Accounts:` }`}
            </span>
            <span>
              {`${banksList.length > 1 ? ` ${banksList.length}` : ` ${JSON.parse(banksList[0].accountsList).length}` }`}
            </span>
          </h2>
          <div className="flex flex-col align-center gap-2">
            <p className="text-[14px] leading-[20px] font-medium text-gray-600">
              Total Currewnt Balance
            </p>
            <div className="flex-center text-[24px] leading-[30px] lg:text-30 flex-1 font-semibold text-gray-900 gap-2">
              $ <CountUpAnimate number={calculateBalance()} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default TotalBalance