# main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from typing import Optional
from pymongo.errors import PyMongoError

from database import live_sessions  # collection
from models import serialize_session

app = FastAPI(title="Live Sessions API")

# CORS - allow only frontend origin(s)
FRONTEND_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "message": "Live Sessions API is running"}

@app.post("/create-session")
def create_session():
    """
    Creates a new admin session and stores it in MongoDB.
    Returns the created session document.
    """
    unique_id = str(uuid4())
    userurl = f"http://localhost:3000/session/{unique_id}"

    session_data = {
        "type": "admin",
        "unique_id": unique_id,
        "userurl": userurl
    }

    try:
        result = live_sessions.insert_one(session_data)
        # fetch inserted doc to return (so we include _id)
        created = live_sessions.find_one({"_id": result.inserted_id})
        return {"message": "Session created", "session": serialize_session(created)}
    except PyMongoError as e:
        # log server-side and return 500 with friendly message
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

@app.get("/session/{unique_id}")
def get_session(unique_id: str):
    """
    Retrieve session by unique_id. Returns 404 if not found.
    """
    try:
        session = live_sessions.find_one({"unique_id": unique_id})
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return serialize_session(session)
