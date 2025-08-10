'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

function DoughnutChart({ data }: DoughnutChartProps) {
    
    // MOCK DATA
    // { 
    //     datasets: [ 
    //         {
    //             label: 'Banks',
    //             data: [1250, 2500, 3750, 2101],
    //             backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
    //         }
    //     ],
    //     labels: [
    //         'Bank 1',
    //         'Bank 2',
    //         'Bank 3',
    //         'Bank 4',
    //     ]
    // }

    return (
        <div className="DoughnutChart_custom">
           <Doughnut 
                data={data}
                options={{
                    cutout: '60%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }} 
           /> 
        </div>
    )
}

export default DoughnutChart