
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

interface StockDataItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }//i have defined the type of my data
interface charprops{
    timeseriesdata:StockDataItem[]
}
const StockChart = ({timeseriesdata}:charprops) => {
  const data:ChartData<'bar'|'line'> = {// i am trying to create a mixed chart using chartjs
    labels: timeseriesdata.map(item => `${new Date(item.date).getDate()}-${new Date(item.date).getMonth()+1}`),//labeled the chart at x axis with DD-MM
    datasets: [
      {
        type: 'bar',
        label: 'Stock Prices',//labeling the bar graph stock prices
        data: timeseriesdata.map(item => item.close - item.open),//mapping them to go up when close is more and down when open is more
        backgroundColor: timeseriesdata.map(item =>
          item.close >= item.open ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)'//coloring closed stock green and open stocks red
        ),
        borderColor: timeseriesdata.map(item =>
          item.close >= item.open ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        ),
        borderWidth: 1,
        stack: 'stack1',
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      },
      {
        type: 'line',
        label: 'Volume',
        data: timeseriesdata.map(item => item.volume),//mapping the volume as a line graph
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.2,
        stack: 'stack2',
        yAxisID: 'y1',
      },
    ],
  };
  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { dataset, raw } = tooltipItem;
            return `${dataset.label}: ${raw}`;
          },
        },
      },
      
      zoom:{

        zoom:{//added zoomability
          scaleMode:'xy',
          wheel: {
            enabled: true,
            speed:0.05
          },
          mode:'xy'
        },
        pan:{//added panability
          enabled:true,
          mode:'xy',
          scaleMode:'xy'
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => {
            return typeof value === 'number' ? Math.abs(value).toPrecision(1) : value;//made the label data precise
          },
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value: number | string) => {
            return typeof value === 'number' ? value.toPrecision(1) : value;//made the label data precise
          },
        },
      },
    },
  };//styled the chart
  return(<div className='h-[20rem] ml-[30rem] '>
    <Chart type='bar' data={data} options={options} autoFocus aria-autocomplete='inline'  />
    
  </div>)
}

export default StockChart;