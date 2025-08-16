'use client'

// helper
import { capitalizeFirstLetter } from "@/lib/utils";

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

    const dispatch = useDispatch();
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const bankHistory = useSelector((state: RootState) => state.bankHistory.bankHistory);
    
    const [selectedBank, setSelectedBank] = useState(null);

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
        const tableList = [];
        JSON.parse(selectedBank.transactions).map(item => {
          tableList.push(item);
        })
        return tableList;
      }
    }

    const tabsOnClick = (selected) => {
      setSelectedBank({...selected});
    }

    useEffect(() => {
      selectBank()
    }, [])
    

    return (
      <section className="p-10">
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
      </section>
    )
}

export default TransactionHistory




