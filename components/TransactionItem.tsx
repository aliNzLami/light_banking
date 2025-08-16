import { formatAmount } from "@/lib/utils"
import Image from "next/image";
import icon from "@/assets/icons/connect-bank.svg"
// redux
import { useDispatch, useSelector } from "react-redux";
import { setAccountTransfer, setBankHistory } from "@/lib/redux/transactionSlice";
import { redirect } from "next/navigation";
import { RootState } from "@/lib/redux/store";


function TransactionItem({transactions}: array) {
  
    const dispatch = useDispatch();
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    
    
    const handleTransactionClick = (item: object) => {
      for(let bank of banksList) {
        if(JSON.parse(bank.institution).institution.name === item['Your Bank Institution:']) {
            dispatch(setBankHistory(bank));
          }
        }
        redirect('/transaction-history')
    }
    
    return (
        <>
          {
            transactions.length 
            ?
            transactions.map((item, index) => {
              return (
                <div  key={index}
                        onClick={() => handleTransactionClick(item)}
                        className={"bank-info shadow-sm border-blue-700 transactioBoxBorder card rounded-xl hover:shadow-lg cursor-pointer p-5 transition-[0.4s]"}
                      >

                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <figure className={`flex justify-center items-center rounded-full bg-blue-100 w-[40px] h-[40px]`}>
                              <Image
                                src={icon}
                                width={20}
                                height={20}
                                alt={`transaction icon`}
                                className="m-2 min-w-5"
                              />
                            </figure>

                            <div className="ms-4">
                              <span className={`text-[16px] leading-[24px] line-clamp-1 flex-1 font-bold text-blue-900 transactioBoxFont`}>
                                {item['Your Bank Institution:']}
                              </span>
                              <p className={`text-[16px] leading-[24px] font-medium text-blue-700 transactioBoxFont`}>
                                {item['Amount of Money:']}
                              </p>
                            </div>
                          </div>

                          <div className="bg-blue-100 rounded-full flex justify-center items-center transactioBoxBg">
                            <p className={`text-[12px] leading-[16px] px-3 py-1 font-medium text-blue-700 text-center darkModeTxt-white`}>
                                {item['Your Account Type:']}
                            </p>
                          </div>

                        </div>
                </div>
              )
            })
            :
            <span className="text-gray-500 txt-darkMode">
                There are no transactions from the last year.
            </span>
          }
        </>
      
      
    )
}

export default TransactionItem