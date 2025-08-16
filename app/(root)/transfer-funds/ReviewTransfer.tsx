import React from 'react'

function ReviewTransfer({data, submit, goBack}: {data: object, submit: Function, goBack: Function}) {

    const content = {
        "Your Bank Institution:": data?.step1?.bank?.institution ? JSON.parse(data?.step1?.bank?.institution).institution?.name??"" : "",
        "Your Account Type:": data?.step1?.account?.name??"",
        "Your Note:": data?.step1?.additionalInfo??"",
        "Receiever's Email:": data?.step2?.email??"",
        "Receiever's Public Plaid Serial:": data?.step2?.publicID??"",
        "Amount of Money:": `$${data?.step2?.amount??""}`,
    }


    const transferOnClick = () => {
        const isValid = checkValidity();
        if(isValid) goNext(form)
    }


    return (
        <>
            <div className="grid recieverFundGrid">
                {
                    Object.keys(content).map(item => {
                        return (
                        <>
                            <div key={item}>
                                <span className="text-[16px] leading-[24px] font-bold text-gray-700 block">
                                    { item }
                                </span>
                            </div>

                            <span key={content[item]}>
                                { content[item] }
                            </span>
                        </>
                        )
                    })
                }
            </div>


            <div className="flex md:justify-between flex-col md:flex-row mt-15">
                <div className="w-[100%] md:w-[130px]">
                    <button 
                        className={`w-[100%] mb-5 md:mb-0 text-primary-panel border-primary-panel py-2 rounded py-2 px-3 cursor-pointer`} 
                        onClick={goBack}
                    >
                        Previous
                    </button>
                </div>

                <div className="w-[100%] md:w-[130px]">
                    <button 
                        className={`primaryButton py-2 rounded`} 
                        onClick={transferOnClick}
                    >
                        Transfer Fund
                    </button>
                </div>
            </div>
        </>
    )
}

export default ReviewTransfer