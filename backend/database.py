# database.py
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "live_sessions_db")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set in .env")

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)

# try to ensure connection at startup (will raise if not reachable)
try:
    client.admin.command("ping")
except PyMongoError as e:
    # Raise to make startup show a clear error
    raise RuntimeError(f"Could not connect to MongoDB: {e}")

db = client[DB_NAME]
live_sessions = db["live_sessions"]
