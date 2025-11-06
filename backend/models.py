# models.py
from bson import ObjectId

def serialize_session(doc: dict) -> dict:
    """
    Convert a MongoDB document into JSON-serializable dict.
    """
    if not doc:
        return {}
    return {
        "id": str(doc.get("_id")),
        "type": doc.get("type"),
        "unique_id": doc.get("unique_id"),
        "userurl": doc.get("userurl"),
    }
