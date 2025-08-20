import React from 'react'

function BankCharts({children, size, title}: {children: React.ReactNode, size: string, title: string}) {
  return (
    <div className='mb-10 pb-10 md:mb-15 pb-15 borderBottomCharts'>
        <span className='mb-10 block text-center md:text-start text-[16px] md:text-[22px] font-semibold txt-darkMode'>
            { title }
        </span>
        <div className=' flex justify-center'>
            <div className={size}>
                {
                    children
                }
            </div>
        </div>
    </div>
  )
}

export default BankCharts