import React from 'react'
import { Button } from './ui/button'

function SubmitBtn({ isLoading, buttonText, onClick }: {isLoading: boolean, buttonText: string, onClick: any}) {
  return (
    <Button className="primaryButton mt-10" type="submit" disabled={isLoading} onClick={onClick}>
        {
            isLoading
            ?
                <div className="animate-spin spin-white w-[20px] h-[20px]"></div>
            :
                `${buttonText}`
        }
    </Button>
  )
}

export default SubmitBtn