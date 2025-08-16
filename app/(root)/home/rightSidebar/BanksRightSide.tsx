import Link from "next/link"
import { redirect } from "next/navigation";

// img
import Image from "next/image"
import plusIcon from "@/assets/icons/plus.svg";
import BankCard from "@/components/BankCard";



function BanksRightSide( { userInfo, banksList} : { userInfo: Object, banksList: object }) {

    return (
        <>
            <div className="flex flex-col justify-between gap-8 px-6 py-8">
                <div className="flex w-full justify-between">
                <span className="text-18 font-semibold text-gray-900 text-b&w">
                        My Banks
                </span> 
                <Link className="flex gap-2" href='/my-banks'>
                        <Image 
                            alt="plus"
                            src={plusIcon}
                            width={20}
                            height={20}
                        />
                        <span className="text-[14px] leading-[20px] font-semibold text-gray-600 text-b&w">
                            Add Bank
                        </span>
                </Link>
                </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-5" onClick={() => redirect('/my-banks')}>
                <div className="relative z-10">
                    <BankCard
                        bankInfo={banksList[0]}
                        accountNumber={0}
                    />
                </div>
                <div className="absolute right-[8px] top-8 z-0 w-[90%]">
                    <BankCard 
                        bankInfo={banksList[1] ? banksList[1] : banksList[0]}
                        accountNumber={banksList[1] ? 0 : ( JSON.parse(banksList[0].accountsList)[1] ? 1 : 0 )}
                    />
                </div>
            </div>
        </>
    )
}

export default BanksRightSide