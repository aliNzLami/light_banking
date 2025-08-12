import Link from "next/link"

import {lightenColor} from "@/lib/utils";

// img
import Image from "next/image"
import paypassIocn from "@/assets/icons/Paypass.svg";
import lines from "@/assets/icons/lines.png";

function BankCard({bankInfo, accountNumber}: {bankInfo: Object, accountNumber: number}) {

    const cardInfo = JSON.parse(bankInfo.accountsList);
    const logo = JSON.parse(bankInfo?.institution).institution.logo
    const color = JSON.parse(bankInfo?.institution).institution.primary_color;
    const gradient = `linear-gradient(${color}, ${lightenColor(color, -10)})`

    return (
        <div className="flex flex-col">
            <Link href="/my-banks" className="relative flex h-[190px] w-full max-w-[320px] md:max-w-[400px] justify-between rounded-[20px] border border-white bg-blue-gradient shadow-md backdrop-blur-[6px]">
                <div className="relative flex size-full max-w-[300px] md:max-w-[350px] flex-col justify-between rounded-l-[20px] bg-gray-700 px-5 pb-4 pt-5" style={{background: gradient}}>
                    <div>
                        <span className="text-[16px] leading-[24px] font-bold text-white nameOnCard">
                            { JSON.parse(bankInfo.institution).institution.name??"" }
                        </span>
                        <p className={`font-ibm-plex-serif font-black text-white mt-3 ${logo ? "" : "min-w-[190px]"}`}>
                            {cardInfo[accountNumber].name}
                        </p>
                    </div>
                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="text-[12px] leading-[16px] font-semibold text-white"> 
                                <span className="block">
                                { `$ ${cardInfo[accountNumber].balances.current}` }
                                </span>
                                <span className="block">
                                    { bankInfo.userName }
                                </span>
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

                <div className="flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-cover bg-center bg-no-repeat py-5 pr-5" style={{background: gradient}}>
                    <Image 
                        src={ paypassIocn }
                        width={15}
                        height={20}
                        alt="pay"
                        className="absolute top-[10px] right-[15px]"
                    />
                    {
                        logo
                        &&
                        <img 
                            src={ `data:image/png;base64, ${logo}` }
                            width={30}
                            height={15}
                            alt="card logo"
                            className="absolute bottom-[5px] right-[10px]"
                        />
                    }
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