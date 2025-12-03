from sqlalchemy import create_engine,String,Column,Integer,DateTime,Boolean
from sqlalchemy.orm import declarative_base,sessionmaker
from datetime import datetime

SQLITE_URL = 'sqlite:///./medicines.db'
engine = create_engine(SQLITE_URL,connect_args={"check_same_thread":False})
SessionLocal = sessionmaker(bind=engine,autoflush=False)
Base = declarative_base()

class Medicine(Base):
    __tablename__ = "medicine"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True,nullable=False)
    dosage = Column(String,nullable=True)
    stock = Column(Integer,default=0)
    next_time = Column(DateTime,nullable=True)
    status = Column(String,default='')
class Remainder(Base):
    __tablename__ = "remainders"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True,nullable=False)
    dosage = Column(String)
    notified  = Column(Boolean,default=False)
class MedicineInsight(Base):
    __tablename__ = "medicineInsight"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True,nullable=False)
    count = Column(Integer,default=0)
def init_db():
    Base.metadata.create_all(engine)