import SubmitBtn from "@/components/SubmitBtn"

function MyBanksHeader({handleClick}: {handleClick: Function}) {
  return (
    <>
        <h1 className="text-[26px] leading-[32px] font-bold text-center md:text-start">
            Your Bank Accounts
        </h1>
        <span className="text-[18px] leading-[22px] font semibold block text-gray-600 text-b&w mt-3 text-center md:text-start">
            All details of your bank accounts. Add your banks, transfer fast.
        </span>

        <div className="md:w-[150px]">
            <SubmitBtn 
                buttonText={'Add Bank'}
                onClick={handleClick}
                isLoading={false}
            />
        </div>
    </>
  )
}

export default MyBanksHeader