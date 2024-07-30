import { useEffect, useState } from 'react';

import axios from 'axios';
import StockChart from '../components/StockChart';
import Button from '../components/Button';
import SeachBar from '../components/SeachBar';

interface StockDataItem {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
const Home = () => {
    const [symbol,setSymbol]=useState('AAPL');//then i created a usestate that will keep track of the current symbol
    const [timeseriesdata,setTimeseriesdata]=useState<StockDataItem[]>([])//then i created a usestate to store the timeseries data
    useEffect(()=>{
        const fetchdata=async ()=>{
            try{
                const response=await axios.get(`http://localhost:3000/api/stock/${symbol}`);// i am using a get request to get the data
                setTimeseriesdata(response.data);//once i got the response data i am storing it in the timeseriesdata usestate
            }
            catch(err:any){
                    console.log(err);
            }
        }
        fetchdata()
    },[,symbol])//everytime the window reloads or a change in the state of symbol occurs i call the api to get stock data

    return (
        <div className='flex flex-col  ' >
            <SeachBar
            setSymbol={setSymbol}//i am sending the usestate of symbol to search as well
            />
            
            <StockChart
            timeseriesdata={timeseriesdata}//i am sendng that data to my stockchart component
            />
            <Button
            setSymbol={setSymbol}// i am sending the usestate of symbol to the button component
            />
        </div>
    )
    }


export default Home