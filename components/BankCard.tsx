import Link from "next/link"

// img
import Image from "next/image"
import paypassIocn from "@/assets/icons/Paypass.svg";
import mastercardIcon from "@/assets/icons/mastercard.svg";
import lines from "@/assets/icons/lines.png";

function BankCard({bankInfo, accountNumber}: {bankInfo: Object, accountNumber: number}) {

    const cardInfo = JSON.parse(bankInfo.accountsList);
    const logo = JSON.parse(bankInfo?.bankData)?.logo??""
    

    return (
        <div className="flex flex-col">
            <Link href="/my-banks" className="relative flex h-[190px] w-full max-w-[320px] justify-between rounded-[20px] border border-white bg-blue-gradient shadow-md backdrop-blur-[6px]">
                <div className="relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-[20px] bg-gray-700 bg-blue-gradient px-5 pb-4 pt-5">
                    <div>
                        <span className="text-[16px] leading-[24px] font-bold text-white">
                            { bankInfo.userName }
                        </span>
                        <p className="font-ibm-plex-serif font-black text-white min-w-[190px] mt-3">
                            { JSON.parse(bankInfo.bankData)?.name??"" }
                        </p>
                    </div>
                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-[12px] leading-[16px] font-semibold text-white"> 
                                { `Type: ${cardInfo[accountNumber].type}` }
                            </span>
                            <span className="font-semibold text-white">
                                <span className="text-[10px]">
                                    ⬤⬤
                                </span>
                                <span className="text-[13px] leading-[16px] mx-2">
                                    / 
                                </span>
                                <span className="text-[10px]">
                                    ⬤⬤
                                </span>
                            </span>
                        </div>
                        <p className="text-[14px] leading-[20px] font-semibold tracking-[1.1px] text-white">
                            <span className="text-[11px]">
                                ⬤⬤⬤⬤ ⬤⬤⬤⬤ ⬤⬤⬤⬤ {cardInfo[accountNumber].mask}
                            </span>
                        </p>
                    </article>
                </div>

                <div className="flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-bank-gradient bg-cover bg-center bg-no-repeat py-5 pr-5">
                    <Image 
                        src={ logo ? logo : paypassIocn}
                        width={20}
                        height={24}
                        alt="pay"
                        className="cardIcon"
                    />
                    <Image 
                        src={lines.src}
                        width={316}
                        height={190}
                        alt="lines"
                        className="absolute top-0 left-0"
                    />
                </div>
            </Link>
        </div>
    )
}

export default BankCard