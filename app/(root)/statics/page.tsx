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
import BankStatics from "./BankStatics";

function Statics() {
    interface Bank {
        transactions: any;
        $id: string;
    }

    const dispatch = useDispatch();
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const bankHistory = useSelector((state: RootState) => state.bankHistory.bankHistory);
    
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  
    const tabsOnClick = (selected: any) => {
        setSelectedBank({...selected});
    }

    useEffect(() => {
        setSelectedBank({...banksList[0]})
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
                    <BankStatics 
                        bank={selectedBank}
                    />
                    </>
                :
                    <LoadingPage />
                }
            </div>
        </section>
    )
}

export default Statics