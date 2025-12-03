import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { requestNotificationPer } from './notifications'
import useRemainderPoller from './useRemainderPoller'
import Insights from './components/Insights'

const App = () => {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [stock, setStock] = useState(0)
  const [next_time, setNext_time] = useState('')
  const [medicines,setMedicines] = useState([])
  const [context,setContext] = useState("")
  let [res,setRes] = useState([])
  const getlog = async()=>{
    try {
      const {data} = await axios.get("http://127.0.0.1:8000/medicines")
      if(data){
        setMedicines(data)
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getlog();
    requestNotificationPer();
  },[]);
  useRemainderPoller(20000);
  const onSubmitH = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/medicines",
        { name, dosage, stock, next_time }
      )
      window.location.reload()
      console.log("Backend Response → ", data)
    } catch (err) {
      console.error("Error sending data:", err)
    }
  }
  const IncreaseStock = async(med_id)=>{
    try {
      const {data} = axios.post(`http://127.0.0.1:8000/medicines/${med_id}/resupply?amount=1`)
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }
  const takemedic = async(med_id)=>{
    try {
      const {data} = await axios.post(`http://127.0.0.1:8000/medicines/${med_id}/take`)
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }
  const removemedic = async(med_id)=>{
    try {
      const {data} = await axios.delete(`http://127.0.0.1:8000/medicines/${med_id}`)
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }
  const MedAI = async(e)=>{
     e.preventDefault()
    try {
      const {data} = await axios.post("http://127.0.0.1:8000/medai",{context})
      setRes((res)=>[...res,`ME : ${context}`,`MEDAI : ${data.ChatAI}`])
      console.log(data.ChatAI)
    } catch (error) {
      
    }
  }

  return (
    <div className='body'>
      <div className='Header'>
        <div><header>Medicine-Reminder</header></div>

        <div className='mainhero'>
          <div className='maindiv'>
            <h1 style={{fontSize:40}}>Enter Medicine Details</h1>

            <form onSubmit={onSubmitH}>

              <p>Name of Medicine</p>
              <input 
                onChange={e => setName(e.target.value)} 
                value={name} 
                type='text' 
                placeholder='name' 
              />

              <p>Dosage - tablets per day</p>
              <input 
                onChange={e => setDosage(e.target.value)} 
                value={dosage} 
                type='number' 
                min={0} 
              />

              <p>Stock</p>
              <input 
                onChange={e => setStock(e.target.value)} 
                value={stock} 
                type='number' 
                placeholder='Enter stock' 
              />

              <p>Time for Reminder</p>
              <input 
                onChange={e => setNext_time(e.target.value)} 
                value={next_time} 
                type='datetime-local' 
              />
              <br />

              <button type='submit'>Add</button>
            </form>
          </div>
        </div>

        <div>
          <div className='maindiv_'>
            <h1 style={{fontSize:30}}>Medicine Log</h1>
            <div className='logbook'>
              <div className='namelog'><h1>Name</h1>
              {medicines.map(medic=>(
                <div key={medic.id}><button onClick={()=>takemedic(medic.id)} style={{width:5,height:15,textAlign:'center',marginRight:4}}>-</button>{medic.name}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>Dosage</h1>
              {medicines.map(medic=>(
                <div key={medic.id}>{medic.dosage}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>stock</h1>
              {medicines.map(medic=>(
                <div key={medic.id}>{medic.stock}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>Day</h1>
              {medicines.map(medic=>(
                <div key={medic.id}>{new Date(medic.next_time).getDate().toString().padStart(2,'0')}/{(new Date(medic.next_time).getMonth()+1).toString().padStart(2,'0')}/{new Date(medic.next_time).getFullYear().toString().slice(-2)}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>Time for medicine</h1>
              {medicines.map(medic=>(
                <div key={medic.id}>{new Date(medic.next_time).getHours().toString().padStart(2,'0')} : {new Date(medic.next_time).getMinutes().toString().padStart(2,'0')}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>Status</h1>
              {medicines.map(medic=>(
                <div key={medic.id}>{medic.status == "Low Stock Alert" ? <div>"Low Stack Alert" <button onClick={()=>IncreaseStock(medic.id)}>+</button></div>:"OK"}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>Action</h1>
              {medicines.map(medic=>(
                <div key={medic.id}>{Date.now() >= new Date(medic.next_time) ? <div style={{color:'red'}}>Take medicine</div>:<div style={{color:"green"}}>Relax</div>}</div>
              ))}
            </div>
            <div className='namelog'>
              <h1>Delete</h1>
              {medicines.map(medic=>(
                <div key={medic.id}><img onClick={()=>removemedic(medic.id)} style={{width:15,height:15,cursor:'pointer'}} src='src/images/delete.png'/></div>
              ))}
            </div>
          </div>
          </div>
        </div>
        <h1 style={{fontSize:50}}>MEDAI</h1>
        <div style={{width:1050,marginBottom:30}}>MEDAI is your smart health buddy—always ready with simple tips, daily reminders, and wellness guidance to keep you feeling your best.</div>
        <div className='maindiv_chat'>
          <div className='AIres'>{
          res.map(r=>(
            <div style={{marginTop:10}}>{r}</div>
          ))
          }</div>
        <div className='Chattext'>
            <form onSubmit={MedAI}>
            <input onChange={e=>setContext(e.target.value)} value={context} type='text'/>
            <button>send</button>
          </form>
          </div>
        </div>
        <Insights/>
      </div>
    </div>
  )
}

export default App
