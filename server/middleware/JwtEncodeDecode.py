import jwt
from datetime import datetime, timedelta
from jwt.exceptions import ExpiredSignatureError, PyJWTError

JWT_SECRET = "JWTSECERET"

def jwtEncode(payload):
    try:
        expiration_time = datetime.utcnow() + timedelta(hours=24)
        payload['exp'] = expiration_time
        token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        return {"success": True, "token": token}
    except ExpiredSignatureError:
        return {"error": "Token has expired."}
    except PyJWTError as e:
        # Handle other JWT-related errors
        return {"error": f"JWT error: {e}"}

def jwtDecode(encoded_jwt):
    try:
        jwt.decode(encoded_jwt, JWT_SECRET, algorithms=["HS256"])
        return {"success": True}
    except ExpiredSignatureError:
        return {"success": False, "error": "Token has expired."}
    except PyJWTError as e:
        return {"success": False, "error": f"JWT decoding error: {e}"}
