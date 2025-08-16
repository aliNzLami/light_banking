'use client'

// redux
import { useDispatch, useSelector } from "react-redux";
import { setAccountTransfer } from "@/lib/redux/transactionSlice";
import { RootState } from "@/lib/redux/store";

// components
import Dropdown from "@/components/DropDown";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { emailValidate } from "@/lib/utils";

function SelectRecieverFundTransfer({goNext, goBack, balance}: {goNext: Function, goBack: Function, balance: number}) {

    const [form, setForm] = useState({
        email: '',
        publicID: '',
        amount: ''
    })
    const [isValid, setIsValid] = useState(false);

    const content = [
        {
            state: 'email',
            className:"recieverEmail",
            title: "Reciever's Email Address",
            input: {
                type: 'email',
                className: 'recieverEmailInput',
                placeholder: 'e.g: elon@gmail.com',
            }
        },
        {
            state: 'publicID',
            className:"recieverPlaid",
            title: "Reciever's Plaid Sherable ID",
            input: {
                type: 'text',
                className: 'recieverPlaidInput',
                placeholder: 'Enter the public account number',
            }
        },
        {
            state: 'amount',
            className:"amountTransfer",
            title: "Amount",
            input: {
                type: 'number',
                className: 'amountTransferInput',
                placeholder: 'e.g: $5',
            }
        },
      ]

      const changeInput = (output) => {
        setForm(prev => ({
            ...prev,
            [output.key]: output.value
        }))
      }

      const checkValidity = () => {
        if( ! (form.amount.trim() && form.email.trim() && form.publicID.trim()) ) return false;
        if( ! ( emailValidate(form.email) ) ) return false;
        if( ! ( Number(form.amount) && Number(form.amount) > 0 && Number(form.amount) < balance  )  ) return false;
        return true
      }

      const transferOnClick = () => {
        const isValid = checkValidity();
        if(isValid) goNext(form)
      }

        return (
            <>
                <div className="grid recieverFundGrid">
                    {
                    content.map(item => {
                        return (
                        <>
                            <div key={item.className} className={item.className}>
                            <span className="text-[16px] leading-[24px] font-bold text-gray-700 block">
                                { item.title }
                            </span>
                            </div>

                            <Input 
                                type={item.input.type}
                                className={`${item.input.className} mb-8 md:mb-0`}
                                key={item.input.className} 
                                placeholder={item.input.placeholder}
                                onChange={(e) => changeInput({key: item.state, value: e.target.value})}
                            />
                        </>
                        )
                    })
                    }
                </div>


                <div className="flex md:justify-between flex-col md:flex-row mt-15">
                    <div className="w-[100%] md:w-[130px]">
                        <button 
                            className={`w-[100%] mb-5 md:mb-0 text-primary-panel border-primary-panel py-2 rounded py-2 px-3 cursor-pointer`} 
                            onClick={goBack}
                        >
                            Previous
                        </button>
                    </div>

                    <div className="w-[100%] md:w-[130px]">
                        <button 
                            className={`primaryButton py-2 rounded ${checkValidity() ? "" : "opacity-[0.5]"}`} 
                            onClick={transferOnClick}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </>
        )
}

export default SelectRecieverFundTransfer