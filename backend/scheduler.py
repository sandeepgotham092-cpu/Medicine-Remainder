from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from db import SessionLocal,Medicine,Remainder
import smtplib
from email.message import EmailMessage

def send_email_stub(to_email:str,subject:str,body:str):

    print(f"[Email STUB] To : {to_email} | Subject : {subject}\n{body}\n")
def check_and_send():
    db = SessionLocal()
    try:
        now = datetime.now()
        meds = db.query(Medicine).filter(Medicine.next_time != None).all()
        remem = [i[0] for i in db.query(Remainder.name).all()]
        for m in meds:
            if m.next_time and m.next_time <= now:
                if m.name not in remem:
                    db.add(Remainder(name=m.name,dosage=m.dosage))
                    db.commit()
        db.commit()
    finally:
        db.close()
def start_scheduler():
    sched = BackgroundScheduler(timeZone="UTC")
    sched.add_job(check_and_send,"interval",seconds = 30)
    sched.start()
    return sched
