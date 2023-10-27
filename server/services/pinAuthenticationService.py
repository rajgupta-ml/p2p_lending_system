import bcrypt
from middleware.JwtEncodeDecode import jwtEncode
def pinAuthenticationService(data, mysql):
    try:
        if not data['email'] or not data['pin']:
            return {"error": "Invalid Pin"}
        

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT pin FROM user WHERE emailId = %s", (data['email'],))
        row = cursor.fetchone()

        if row is None:
            return {"error": "Invalid pin."}
        

        hashed_pin = row[0].encode('utf-8')

        if bcrypt.checkpw(data['pin'].encode('utf-8'), hashed_pin):
            jwt = jwtEncode({"email" : data['email']})
            if(jwt['success']):
                return {"success": True, "jwtToken": jwt['token']}
        else:
            return {"error": "Invalid pin"}
        
    except Exception as e:
        print(e)        
        return e
    finally:
        cursor.close()