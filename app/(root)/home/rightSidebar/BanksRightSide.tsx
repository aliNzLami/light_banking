import Image from "next/image"
import Link from "next/link"
import plusIcon from "@/assets/icons/plus.svg";
import BankCard from "@/components/BankCard";

function BanksRightSide() {
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

            {
                // banks?.length > 0 &&
                true &&
                <div className="relative flex flex-col items-center justify-center gap-5">
                    <div className="relative z-10">
                        <BankCard 
                            bankInfo={{}}
                            fullName={""}
                        />
                    </div>
                    {
                        // banks[1] &&
                        true &&
                        <div className="absolute right-0 top-8 z-0 w-[90%]">
                            <BankCard 
                                bankInfo={{}}
                                fullName={""}
                            />
                        </div>
                    }
                </div>
            }
    </>
  )
}

export default BanksRightSide