'use client'
import HeaderTitle from "@/components/HeaderTitle"
import SelectBankFundTransfer from "./SelectBankFundTransfer"
import { useState } from "react"
import SelectRecieverFundTransfer from "./SelectRecieverFundTransfer";
import ReviewTransfer from "./ReviewTransfer";
import TransferProgress from "./TransferProgress";

function TransferFunds() {

  //  ------------------------- STATES ------------------------- //

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setdata] = useState({});



  //  ------------------------- FUNCTIONS ------------------------- //

  const changeData = (output: object) => {
    setdata(prev => ({
      ...prev,
      [`step${output.step}`]: output.data
    }))
    setCurrentStep(output.step + 1)
  }



  //  ------------------------- CONTENT ------------------------- //
  const content = [
    {
      component: <SelectBankFundTransfer goNext={(data) => changeData({data, step: 1})} />,
      step: 1
    },
    {
      component: <SelectRecieverFundTransfer goNext={(data) => changeData({data, step: 2})} balance={data?.step1?.account?.balances?.current??""} goBack={() => setCurrentStep(prev => prev - 1)} />,
      step: 2
    },
    {
      component: <ReviewTransfer submit={() => {}} data={data} goBack={() => setCurrentStep(prev => prev - 1)} />,
      step: 3
    },
  ]

  return (
    <section className="p-10">
      <div className="flex flex-col bg-gray-25 md:max-h-screen">
        <HeaderTitle 
          text1='Payment Transfer'
          description='Please provide any specific details or notes related to the payment transfer'
        />

        <TransferProgress current={currentStep} length={content.length} />

        {
          content.map(item => {
            return(
              <div key={item.step} className={`size-full mt-15 ${item.step !== currentStep ? "hidden" : ""}`}>
                { item.component }
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default TransferFunds