import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({data, options = null}: {data: any, options: any}) {

    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: 'Sales',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)', // fill color
    //             borderColor: 'rgba(75, 192, 192, 1)', // border color
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const options = {
    //     indexAxis: 'y', // makes the chart horizontal
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: 'right',
    //       },
    //     },
    //     scales: {
    //       x: {
    //         beginAtZero: true,
    //       },
    //     },
    // };

  return (
    <div className='barChart_custom'>
        {
            options
            ?
                <Bar options={options} data={data} />
            :
                <Bar data={data} />
        }
    </div>
  )
}

export default BarChart