import bcrypt
def pinGenerationService(data, mysql):
    try:
        salt = bcrypt.gensalt(rounds = 12)
        cursor = mysql.connection.cursor()
        encode_pin = data['pin'].encode('utf-8')
        hashed_password = bcrypt.hashpw(encode_pin, salt)
        cursor.execute("UPDATE user set pin = (%s) where emailId = (%s)", (hashed_password, data['email']))
        cursor.execute("UPDATE user set walletAmt = (%s) where emailId = (%s)", (2000, data['email']))
        mysql.connection.commit()
        return {"success" : True}
    except Exception as e:
        print(e)
        return {"success" : False, "error": e}
    finally:
        cursor.close()
