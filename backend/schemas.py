# schemas.py
from pydantic import BaseModel

class SessionOut(BaseModel):
    id: str
    type: str
    unique_id: str
    userurl: str
