import React, { useEffect, useState } from 'react'
import { BarChart } from 'recharts'
import BarChartComp from './BarChart'
import axios from 'axios'
import './insights.css'
const Insights = () => {
  const [datainsight,setDatainsight] = useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/medinsight")
    .then(res =>setDatainsight(res.data))
    .catch(console.error)
  },[])
  return (
    <div>
      <div className='insightcon'>
        <h1>Insights</h1>
        <div style={{marginBottom:30,width:1050}}>
         This bar chart gives a clear view of your medicine consumption.
Each bar represents a medicine, and its height shows the total number of tablets you’ve taken.
This helps you track usage patterns and identify which medicines you’re taking more frequently.
        </div>
        <BarChartComp data={datainsight}/>
      </div>
    </div>
  )
}

export default Insights
