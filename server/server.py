from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from services.registerUserService import registerUserService
from services.pinGenerationService import pinGenerationService
from services.loginService import  loginService
from services.pinAuthenticationService import pinAuthenticationService


app = Flask(__name__)
CORS(app)
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "PASSWORD"
app.config["MYSQL_DB"] = "p2p_lending_system"


mysql = MySQL(app)

regError = {"error": "An error occurred during registration."}
@app.route('/register', methods = ['POST'])
def registerInteractor():
    try:
        response = registerUserService(request.json, mysql)
        return jsonify(response), 200
    except Exception as e:
        return jsonify(regError), 400
 


@app.route('/register/pin-generation', methods = ['POST'])
def pinGenerationInteractor():
    try:
        response = pinGenerationService(request.json, mysql)
        return jsonify(response), 200
    except Exception as e:
        return jsonify(regError), 400


@app.route('/login', methods = ['POST'])
def loginInteractor():
    try:
        response = loginService(request.json, mysql)
        return jsonify(response), 200
    except Exception as e:
        return jsonify(regError), 400

@app.route('/pin-authentication', methods = ['POST'])
def pinAuthInteractor():
    try:
        response = pinAuthenticationService(request.json, mysql)
        return jsonify(response), 200
    except Exception as e:
        return jsonify(regError), 400


if __name__ == '__main__':
    app.run(debug=True, port = 8080)