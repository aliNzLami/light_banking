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
import { capitalizeFirstLetter } from "@/lib/utils";



function TransactionHistory() {

    const MOCK = [
      {
        transaction_id: "DFSDFSD", 
        account_id: "FDSFSDF", 
        category: ['sTH'],
        amount: 200,
        date: '2025,08,09',
        name: 'Shopify',
        payment_channel: "online"
      },
      {
        transaction_id: "DFSDFSD", 
        account_id: "FDSFSDF", 
        category: ['sTH'],
        amount: 200,
        date: '2025,08,09',
        name: 'Shopify',
        payment_channel: "online"
      }
    ]

    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const [selectedBank, setSelectedBank] = useState(null);

    const selectBank = () => {
      setSelectedBank({...banksList[0]})
    } 

    const prepareList = () => {
      if(selectedBank) {
        const tableList = [];
        JSON.parse(selectedBank.transactions).map(item => {
          const { transaction_id, account_id, category, payment_channel, amount, ...rest } = item;
          tableList.push({
            category: category[0],
            amount: {title: `$${amount}`, color: "#0ecf0e"},
            channel: capitalizeFirstLetter(payment_channel),
            ...rest
          });
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
                    JSON.parse(selectedBank.transactions).length
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




