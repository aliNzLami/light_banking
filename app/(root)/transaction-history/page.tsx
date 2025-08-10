'use client'

// hooks
import { useEffect, useState } from "react";

import CustomTable from "@/components/CustomTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

function TransactionHistory() {

    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const [dataTabale, setDataTabale] = useState([]);

    const selectBank = (id: string) => {
      if(banksList.length === 1) {
        prepareList(JSON.parse(banksList[0].transactions))
      }
      else {
        const selectedBank = banksList.filter(item => item.$id === id);
        prepareList(JSON.parse(selectedBank[0].transactions))
      }
    } 

    const prepareList = (list: array) => {
      if(list.length) {
        const finalList = [];
        for(let transaction of list) {
          const { transaction_id, account_id, category, ...rest } = transaction;
          finalList.push(rest);
        }
        setDataTabale([...finalList]);
      }
      else {
        setDataTabale([]);
      }
    }

    useEffect(() => {
      selectBank(banksList[0].$id)
    }, [banksList])
    
    return (
      <section className="p-10">
        <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>

          <div className="mt-10">
            {
              dataTabale.length
              ?
                <CustomTable 
                  list={dataTabale}
                />
              :
                ""
            }
          </div>
      </section>
    )
}

export default TransactionHistory