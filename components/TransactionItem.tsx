import { formatAmount } from "@/lib/utils"
import Image from "next/image";
import icon from "@/assets/icons/connect-bank.svg"

function TransactionItem({transaction}: object) {
  return (
    <div
    //   onClick={handleBankChange}
      className={"bank-info shadow-sm border-blue-700 card rounded-xl hover:shadow-lg cursor-pointer p-5 transition-[0.4s]"}
    >

      <div className="flex justify-between">
        <div className="flex items-center">
          <figure className={`flex justify-center items-center rounded-full bg-blue-100 w-[40px] h-[40px]`}>
            <Image
              src={icon}
              width={20}
              height={20}
              alt={`transaction ${transaction.name}`}
              className="m-2 min-w-5"
            />
          </figure>

          <div className="ms-4">
            <span className={`text-[16px] leading-[24px] line-clamp-1 flex-1 font-bold text-blue-900`}>
              {transaction.name}
            </span>
            <p className={`text-[16px] leading-[24px] font-medium text-blue-700`}>
              {`$ ${transaction.amount}`}
            </p>
          </div>
        </div>

        <div className="bg-blue-100 rounded-full flex justify-center items-center">
          <p className={`text-[12px] leading-[16px] px-3 py-1 font-medium text-blue-700`}>
            CHECKING
          </p>
        </div>

      </div>
    </div>
  )
}

export default TransactionItem