import bcrypt

def registerUserService(data, mysql):
        try:
            salt = bcrypt.gensalt(12)
            cursor = mysql.connection.cursor()
            fullName, email, password = data['fullName'], data['email'], data['password']
            encode_password = password.encode('utf-8')
            hashed_password = bcrypt.hashpw(encode_password, salt)
            cursor.execute("INSERT INTO user (fullName, emailId, password, pin, walletAmt, defaultNo) VALUES (%s, %s, %s, %s, %s, %s)", (fullName, email, hashed_password, "0", "0", "0"))
            mysql.connection.commit()
            return {"success": True}
        except mysql.connector.IntegrityError as e:
            # Handle the duplicate key error here
            return {"success": False, "error": "Duplicate key error: This email is already registered."}
        except Exception as e:
              return {"success": False}
        
        finally:
            cursor.close()
              
                


  