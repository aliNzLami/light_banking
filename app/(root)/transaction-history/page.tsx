'use client'

// hooks
import { useEffect, useState } from "react";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

// component
import CustomTable from "@/components/CustomTable"
import CustomTabs from "@/components/CustomTabs";
import LoadingPage from "@/components/LoadingPage";
import NoTransaction from "./NoTransaction";



function TransactionHistory() {

    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const [selectedBank, setSelectedBank] = useState(null);

    const selectBank = () => {
      setSelectedBank({...banksList[0]})
    } 

    const prepareList = () => {

    }

    const tabsOnClick = (selected) => {
      setSelectedBank({...selected});
    }

    useEffect(() => {
      selectBank()
    }, [])
    

    return (
      <section className="p-10">

            <CustomTabs 
              list={banksList}
              onClick={tabsOnClick}
              type='bank'
            />

            {
              selectedBank
              ?
                <>
                  {
                    selectedBank.length
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




