'use client'

// redux
import { useDispatch, useSelector } from "react-redux";
import { setAccountTransfer } from "@/lib/redux/transactionSlice";
import { RootState } from "@/lib/redux/store";

// components
import Dropdown from "@/components/DropDown";
import { useEffect, useState } from "react";

function SelectBankFundTransfer({goNext}: {goNext: any}) {

    interface SelectedBankTypes {
      bank: any,
      accountList: any,
      account: any,
      additionalInfo: string
    }

    // ------------------------------ REDUX ------------------------------ //
    const dispatch = useDispatch();
    const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
    const accountTransfer = useSelector((state: RootState) => state.bankHistory.accountTransfer);

    // ------------------------------ STATES ------------------------------ //
    const [selectedBank, setSelectedBank] = useState<SelectedBankTypes | any>({
      bank: null,
      accountList: [],
      account: null,
      additionalInfo: ''
    })
  
    // ------------------------------ VARIABLES ------------------------------ //
    const content = [
      {
        className:"bankDescription",
        title: "Select Source Bank",
        description: "Select the bank institution you want to transfer funds from",
        input: {
          type: 'select',
          className: 'bankSelect',
          placeholder: selectedBank.bank ? JSON.parse(selectedBank.bank.institution).institution.name : 'Select your bank',
          options: banksList.map((item: any) => JSON.parse(item.institution).institution.name)
        }
      },
      {
        className:"accountDescription",
        title: "Select an Account",
        description: "Select an account of your bank source",
        input: {
          type: 'select',
          className: 'accountSelect',
          placeholder: selectedBank.account ? selectedBank.account.name : 'Select your account',
          options: selectedBank.accountList
        }
      },
      {
        className:"infoDescription",
        title: `Transfer Note (Optional)`,
        description: "Any additional information",
        input: {
          type: 'textarea',
          className: 'infoTextarea',
          placeholder: 'Write a short note here',
          default: selectedBank.additionalInfo
        }
      },
    ]

    // ------------------------------ FUNCTIONS ------------------------------ //

    const prepareDefault = () => {
      if(accountTransfer) {
        setSelectedBank((prev: any) => ({
          ...prev,
          bank: {...accountTransfer.bank},
          account: {...accountTransfer.account},
          accountList: JSON.parse(accountTransfer.bank.accountsList).map((item: any) => item.name),
        }))
        dispatch(setAccountTransfer(null))
      }
    }

    const selectHandle = (output: any) => {
      if(output.element === 'bankSelect') {
        changeBank(output.selected)
      }
      else {
        changeAccount(output.selected)
      }
    }
    
    const changeBank = (selectedName: string) => {
      const bankObj = banksList.filter((item: any) => JSON.parse(item.institution).institution.name === selectedName)[0]
      setSelectedBank((prev: any) => ({
        ...prev,
        bank: {...bankObj},
        accountList: JSON.parse(bankObj.accountsList).map((item: any) => item.name),
        account: null,
      }))
    }

    const changeAccount = (selectedName: string) => {
      setSelectedBank((prev: any) => ({
        ...prev,
        account: JSON.parse(selectedBank.bank.accountsList).filter((item: any) => item.name === selectedName)[0]
      }))
    }

    const changeDescription = (txt: string) => {
      setSelectedBank((prev: any) => ({
        ...prev,
        additionalInfo: txt
      }))
    }

    // ------------------------------ EFFECTS ------------------------------ //

    useEffect(() => {
      prepareDefault();
    }, [])

    return (
        <>
          <div className="grid transferFundGrid">
            {
              content.map((item: any) => {
                return (
                  <>
                    <div key={item.className} className={item.className}>
                      <span className="text-[16px] leading-[24px] font-bold text-gray-700 block txt-darkMode">
                        { item.title }
                      </span>
                      <span className="text-[14px] leading-[20px] font-medium text-gray-600 block txt-darkMode">
                          { item.description }
                      </span>
                    </div>

                    {
                      item.input.type === 'select'
                      ?
                        <div key={item.input.className} className={`${item.input.className} mb-10 md:mb-0`}>
                          <Dropdown
                            options={item.input.options}
                            placeholder={item.input.placeholder}
                            afterClick={(selected: any) => selectHandle({selected, element: item.input.className})}
                          />
                        </div>
                      :
                        <textarea 
                          className="transactionTxtArea" 
                          key={item.input.className} 
                          placeholder={item.input.placeholder}
                          onChange={(e) => changeDescription(e.target.value)}
                          defaultValue={item.input.default}
                        />
                    }
                  </>
                )
              })
            }
          </div>

          <div className="flex justify-end mt-15">
            <div className="w-[100%] md:w-[100px]">
              <button 
                  className={`primaryButton py-2 rounded ${selectedBank.account ? "" : "opacity-[0.5]"}`} 
                  disabled={!Boolean(selectedBank.account)}
                  onClick={() => goNext(selectedBank)}
              >
                  Next
              </button>
            </div>
          </div>
        </>
    )
}

export default SelectBankFundTransfer