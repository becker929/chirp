from flask import Flask
from flask import render_template

app = Flask(__name__, static_folder="chirp-frontend/build", static_url_path="/")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chirp")
def chirp():
    return app.send_static_file("index.html")
