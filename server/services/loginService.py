import bcrypt
def loginService(data, mysql):

    try:
        if not data['email'] or not data['password']:
            return {"error": "Both username and password are required."}
        

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT password FROM user WHERE emailId = %s", (data['email'],))
        row = cursor.fetchone()

        if row is None:
            return {"error": "Invalid username or password."}
        

        hashed_password = row[0].encode('utf-8')

        if bcrypt.checkpw(data['password'].encode('utf-8'), hashed_password):
            return {"success": True}
        else:
            return {"error": "Invalid username or password."}
    except Exception as e:
        print(e)        
        return e
    
    finally:
        cursor.close()