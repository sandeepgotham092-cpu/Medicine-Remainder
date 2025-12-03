from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import init_db,SessionLocal,Medicine,Remainder,MedicineInsight
from schemas import MedicineCreate,MedicineOut
from scheduler import start_scheduler
from sqlalchemy.orm import Session
from datetime import datetime,timedelta
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
app = FastAPI(title="Medicine Reminder & Stock Tracker")
init_db()
sched = start_scheduler()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)
class Chat(BaseModel):
    context:str
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@app.post("/medicines/",response_model=MedicineOut)
def create_medicine(payload:MedicineCreate,db:Session=Depends(get_db)):
    m = Medicine(name=payload.name,dosage=payload.dosage,stock=payload.stock,next_time=payload.next_time)
    db.add(m)
    db.add(MedicineInsight(name=m.name))
    db.commit()
    db.refresh(m)
    return m
@app.get('/medicines/',response_model=list[MedicineOut])
def list_medicines(db:Session = Depends(get_db) ):
    return db.query(Medicine).all()
@app.post('/medicines/{med_id}/take',response_model=MedicineOut)
def take_dose(med_id : int,db:Session = Depends(get_db)):
    m = db.query(Medicine).filter(Medicine.id == med_id).first()
    if not m:
        raise HTTPException(404,"Medicine not found")
    if m.stock <= 0:
        raise HTTPException(400,"No stock")
    m.stock -= int(m.dosage)
    MI = db.query(MedicineInsight).filter(MedicineInsight.name == m.name).first()
    MI.count += 1
    db.add(MI)
    if m.stock <= 1:
        m.status = "Low Stock Alert"
    m.next_time = (m.next_time or datetime.utcnow()) + timedelta(days=1)
    db.add(m)
    db.commit()
    db.refresh(m)
    return m
@app.post('/medicines/{med_id}/resupply',response_model=MedicineOut)
def resupply(med_id:int,amount:int,db:Session = Depends(get_db)):
    m = db.query(Medicine).filter(Medicine.id == med_id).first()
    if not m:
        raise HTTPException(404,"Medicine not found")
    if amount <= 0:
        raise HTTPException(400,"Amount must be > 0")
    m.stock += amount
    if m.stock > 1:
        m.status = ""
    db.add(m)
    db.commit()
    db.refresh(m)
    return m
@app.delete('/medicines/{med_id}',response_model=MedicineOut)
def removeMed(med_id:int,db:Session = Depends(get_db)):
    m = db.query(Medicine).filter(Medicine.id == med_id).first()
    db.delete(m)
    db.commit()
    return m
@app.post('/medai/')
def medai(payload:Chat,db:Session=Depends(get_db)):
    context = payload.context
    prompt = f"""
promt:{context},MEDAI.
instructions: Respond with three line answers with friendly nature and yourname MEDAI.
"""
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)
    return{"ChatAI":response.text}  
@app.get("/reminders/")
def get_remainders(db:Session = Depends(get_db)):
    r = db.query(Remainder).filter(Remainder.notified == False).first()
    if r and r != {}:
        res = {
        "name":r.name,
        "dosage":r.dosage
    }
        due = res
        r.notified = True
        db.add(r)
        db.commit()
        return due
    else:
        return ""
@app.get("/medinsight/")
def get_med_insight(db:Session = Depends(get_db)):
    return db.query(MedicineInsight).all()  