from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return {"message": "Hello, World! - Melior DevSecOps Internship"}

