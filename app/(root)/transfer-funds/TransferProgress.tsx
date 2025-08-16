import React from 'react'

function TransferProgress({current, length}: {current: number, length: number}) {
    console.log(length);
    
  return (
    <div className='flex justify-between mt-15'>
        {
            Array.from({length: length}).map((item, index) => {
                return(
                    <div className={`progressTransfer ${index >= current ? "" : "progressTransfer_active" }`} key={index}>
                        <span>
                            { index + 1 }
                        </span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TransferProgress