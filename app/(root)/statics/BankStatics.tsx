import BarChart from '@/components/BarChart';
import DoughnutChart from '@/components/DoughnutChart';
import React from 'react'
import BankCharts from './BankCharts';

function BankStatics({bank}: any) {
    
    const prepareBalanceData = () => {
        const data: {
            labels: string[];
            datasets: {
              label: string,
              data: any;
              backgroundColor: string | any,
              borderColor: string,
              borderWidth: number
            }[];
          } = {
            labels: [],
            datasets: [
                {
                    label: 'Balance',
                    data: [],
                    backgroundColor: 'rgba(0, 70, 247, 0.62)', // fill color
                    borderColor: 'rgb(91, 75, 192)', // border color
                    borderWidth: 1,
                },
            ],
        };

        const accounts = JSON.parse(bank.accountsList);
        for(const account of accounts) {
          data.datasets[0].data.push(account?.balances?.current??"")
          data.labels.push(account.name)
        }

        return data;
    }
    

    const prepareTransactionsLength = () => {
        const data: {
            datasets: {
              label: string,
              data: any;
              backgroundColor: string[];
            }[];
            labels: string[];
          } = {
            datasets: [
              {
                label: "Transactions:",
                data: [],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
              }
            ],
            labels: []
        }
        const accounts = JSON.parse(bank.accountsList);
        const transactions = JSON.parse(bank.transactions);
        for(const account of accounts) {
            data.datasets[0].data.push(transactions.filter((item: any) => item['Your Account Type:'] === account.name).length)
            data.labels.push(account.name)
        }
        return data;
    }

    const prepareTransactionsRange = () => {
        const options = {
            indexAxis: 'y',
        }

        const data: {
            datasets: {
              axis: string,
              fill: false,
              label: string,
              data: any;
              backgroundColor: string[];
            }[];
            labels: string[];
          } = {
            datasets: [
              {
                axis: 'y',
                fill: false,
                label: "Transactions Range:",
                data: [],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
              }
            ],
            labels: []
        }
        const transactions = JSON.parse(bank.transactions);
        const accounts = JSON.parse(bank.accountsList);
        for(const account of accounts) {
            const accountTransaction = transactions.filter((item: any) => item['Your Account Type:'] === account.name)
            if(accountTransaction.length) {
                data.datasets[0].data.push(accountTransaction[0]['Amount of Money:'].slice(1))
            }
            else {
                data.datasets[0].data.push(0)
            }
            
            data.labels.push(account.name)
        }
        return {data, options};
    }
    
    return (
        <div className='mt-10'>
                <BankCharts size='w-[320px] md:w-[600px]' title='How much does each accounts have in balance?'>
                    <BarChart options={null} data={ prepareBalanceData() } />
                </BankCharts>

                {
                    JSON.parse(bank.transactions)
                    &&
                    <>
                        <BankCharts size='w-[150px] md:w-[380px]' title='How many transactions does each account has?'>
                            <DoughnutChart data={ prepareTransactionsLength() } />
                        </BankCharts>

                        <BankCharts size='w-[320px] md:w-[600px]' title='How much is the range of transactions among all acounts?'>
                            <BarChart options={prepareTransactionsRange().options} data={ prepareTransactionsRange().data } />
                        </BankCharts>
                    </>
                }

        </div>
    )
}

export default BankStatics