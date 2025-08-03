import { ReactElement } from "react";

declare interface HeaderTitleProps {
    title: string,
    description: string
}

declare interface TotalBalanceProps {
    accounts: array,
    banks: number,
    balance: number
}

declare interface DoughnutChartProps {
    accounts: array,
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
    setIsOpen: Function
}

declare interface InputProps {
    form: Object,
    name: string,
    label: string,
    placeholder: string,
    type: string
}

declare interface FormProps {
    inputsList: array, 
    onSubmit: Function,
    form: Object,
    isLoading: boolean
}

