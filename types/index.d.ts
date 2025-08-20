/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  // ========================================
  
declare interface HeaderTitleProps {
    text1: string,
    text2: string,
    description: string
}

declare interface TotalBalanceProps {
    accounts: any,
    banks: number,
    balance: number
}

declare interface DoughnutChartProps {
    accounts: any,
}

declare type User = {
    $id: string;
    email: string;
    userId: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    firstName: string;
    lastName: string;
    name: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};

declare interface OffcanvasProps {
    content: ReactElement,
    isOpen: Boolean,
    setIsOpen: any
}

declare interface InputProps {
    form: any,
    name: string,
    label: string,
    placeholder: string,
    type: string
}

declare interface FormProps {
    inputsList: any, 
    onSubmit: any,
    form: any,
    isLoading: boolean,
    buttonText: string
}

declare interface HomeHeaderProps {
    userInfo: any, 
    banksList: any, 
}

declare interface BankCardMoadlProps {
    showModal: boolean, 
    onClose: any, 
    data: any,
    deleteCard: any
}

declare interface CustomTabsProps {
    list: any, 
    onClick: any,
    type: string,
    defaultValue: string
}

declare interface DropDownProps {
    options: any, 
    placeholder: string, 
    afterClick: any
}

interface Window {
    Plaid: any; // or a more specific type if available
}