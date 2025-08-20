'use client'

// hooks
import { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setBankHistory } from "@/lib/redux/transactionSlice";
import { RootState } from "@/lib/redux/store";

// component
import CustomTable from "@/components/CustomTable"
import CustomTabs from "@/components/CustomTabs";
import LoadingPage from "@/components/LoadingPage";
import NoTransaction from "./NoTransaction";



function TransactionHistory() {

    interface Bank {
      transactions: any;
      $id: string;
    }

    const dispatch = useDispatch();
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const bankHistory = useSelector((state: RootState) => state.bankHistory.bankHistory);
    
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

    const selectBank = () => {
      if(bankHistory) {
        setSelectedBank({...bankHistory})
        dispatch(setBankHistory(null));
      }
      else {
        setSelectedBank({...banksList[0]})
      }
    } 

    const prepareList = () => {
      if(selectedBank) {
        const tableList: string[] = [];
        if(JSON.parse(selectedBank.transactions)) {
          JSON.parse(selectedBank.transactions).map((item: any) => {
            tableList.push(item);
          })
        }
        return tableList;
      }
    }

    const tabsOnClick = (selected: any) => {
      setSelectedBank({...selected});
    }

    useEffect(() => {
      selectBank()
    }, [])

    return (
      <section className="custom_container">
        <div className="p-10">
            {
              selectedBank
              ?
                <>
                  <CustomTabs 
                    list={banksList}
                    onClick={tabsOnClick}
                    type='bank'
                    defaultValue={selectedBank?.$id??""}
                  />
                  {
                    JSON.parse(selectedBank.transactions)
                    ?
                      <CustomTable 
                        list={prepareList()}
                      />
                    :
                    <NoTransaction 
                      bank={selectedBank}
                    />
                  }
                </>
              :
                <LoadingPage />
            }
        </div>
      </section>
    )
}

export default TransactionHistory




