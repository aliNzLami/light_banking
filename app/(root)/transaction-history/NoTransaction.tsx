import React from 'react'

function NoTransaction({bank}: {bank: object}) {
  return (
        <div className="w-full h-[100%] min-h-[75vh] flex flex-col lg:flex-row justify-center items-center text-center text-[18px] leading-[22px]">
            <span className="text-gray-500 txt-darkMode mb-3 lg:mb-0">
                { `${bank.userName}, ` }
            </span>
            <span>
            <span className="mx-1 blueText font-bold">
                {`${JSON.parse(bank.institution).institution.name}`} 
            </span>
            <span className="text-gray-500 txt-darkMode">
                {` hasn't had any transaction since last year.`}
            </span>
            </span>
        </div>
  )
}

export default NoTransaction