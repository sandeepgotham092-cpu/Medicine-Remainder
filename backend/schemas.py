from pydantic import BaseModel,Field
from typing import Optional
from datetime import datetime

class MedicineCreate(BaseModel):
    name:str
    dosage:Optional[str] = None
    stock : int = Field(...,ge=0)
    next_time : Optional[datetime]
    status : str = ''
class MedicineOut(BaseModel):
    id:int
    name:str
    dosage:Optional[str]
    stock:int
    next_time : Optional[datetime]
    status : str = ''

    class Config:
        orm_mode = True