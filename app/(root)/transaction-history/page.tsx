'use client'

// hooks
import { useEffect, useState } from "react";

import CustomTable from "@/components/CustomTable"

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import CustomTabs from "@/components/CustomTabs";

function TransactionHistory() {

    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const userInfo = useSelector((state: RootState) => state.userInfo.value);
    const [dataTabale, setDataTabale] = useState({
      id: banksList[0].$id,
      list: []
    });

    const prepareBanksTabs = () => {
      const banks = banksList.map(item => {
        return { id: item.$id, name: JSON.parse(item.institution).institution.name }
      })
      return(banks);
    }

    const findSelectedBank = () => {
      const selected = banksList.map(item => {
        if(item.$id === banksList[0].$id) {
          return item
        }
      });
      return selected[0];
    }

    const selectBank = (id: string) => {
      if(banksList.length === 1) {
        prepareList(JSON.parse(banksList[0].transactions), id)
      }
      else {
        const selectedBank = banksList.filter(item => item.$id === id);
        prepareList(JSON.parse(selectedBank[0].transactions), id)
      }
    } 

    const prepareList = (list: array, id: string) => {
      if(list.length) {
        const finalList = [];
        for(let transaction of list) {
          const { transaction_id, account_id, category, ...rest } = transaction;
          finalList.push(rest);
        }
        setDataTabale({
          id,
          list: [...finalList]
        });
      }
      else {
        return
      }
    }

    useEffect(() => {
      selectBank(banksList[0].$id)
      prepareBanksTabs()
    }, [banksList])

    return (
      <section className="p-10">

            <CustomTabs 
              list={prepareBanksTabs()}
            />

            {
              dataTabale.length
              ?
                <CustomTable 
                  list={dataTabale.list}
                />
              :
                <div className="w-full h-[100%] min-h-[75vh] flex flex-col lg:flex-row justify-center items-center text-center text-[18px] leading-[22px]">
                  <span className="text-gray-500 text-b&w">
                      { `${userInfo.name}, ` }
                  </span>
                  <span>
                    <span className="mx-1 blueText font-bold">
                      {`${JSON.parse(findSelectedBank().institution).institution.name}`} 
                    </span>
                    <span className="text-gray-500 text-b&w">
                      {` hasn't had any transaction since last year.`}
                    </span>
                  </span>
                </div>
            }
      </section>
    )
}

export default TransactionHistory