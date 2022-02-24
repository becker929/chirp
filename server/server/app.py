import json
import sqlite3
import random
from os import environ

from flask import Flask
from flask import g
from flask import request
from requests import get

IS_DEV = environ.get("FLASK_ENV", "production") == "development"
WEBPACK_DEV_SERVER_HOST = "http://localhost:3000"
DB_PATH = environ.get("DB_PATH", "chirp.db")

app = Flask(__name__)

con = sqlite3.connect(":memory:")
cursor = con.cursor()


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


def proxy(host, path):
    response = get(f"{host}{path}")
    excluded_headers = [
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
    ]
    headers = {
        name: value
        for name, value in response.raw.headers.items()
        if name.lower() not in excluded_headers
    }
    return (response.content, response.status_code, headers)


@app.route("/")
def getRoot():
    return "Welcome!"


@app.route("/app/", defaults={"path": "index.html"})
@app.route("/app/<path:path>")
def getApp(path):
    if IS_DEV:
        return proxy(WEBPACK_DEV_SERVER_HOST, request.path)
    return app.send_static_file(path)


@app.route("/sequence", methods=["GET", "PUT", "POST"])
def sequence():
    if request.method == "GET":
        if "sequence" in request.args and request.args.get("sequence") != "null":
            sequence_name = request.args.get("sequence")
            print(sequence_name)
            cursor = get_db().cursor()
            sequences_raw = cursor.execute(
                """SELECT * FROM sequences WHERE name=:sequence_name""",
                {"sequence_name": sequence_name},
            )
            sequence_data = json.loads(list(sequences_raw)[0][1])
            return sequence_data
        else:
            cursor = get_db().cursor()
            sequences_raw = cursor.execute(
                """SELECT * FROM sequences""",
            )
            sequence_data = json.loads(list(sequences_raw)[0][1])
            return sequence_data

    elif request.method == "PUT":
        sequence_data = json.loads(request.data)
        print(request.data)
        sequence_name = request.args.get("sequence")
        print(sequence_name)
        connection = get_db()
        cursor = connection.cursor()
        cursor.execute(
            """
            UPDATE sequences
            SET data = :data
            WHERE name = :name
            """,
            {"name": sequence_name, "data": request.data},
        )
        connection.commit()
        return {"OK": 0}

    elif request.method == "POST":
        with open("./server/words.json") as words_file:
            word_choices = json.load(words_file)["words"]
            print(word_choices)
            sequence_name_words = []
            for _ in range(3):
                sequence_name_words.append(random.choice(word_choices))
            sequence_name = "-".join(sequence_name_words)
            connection = get_db()
            cursor = connection.cursor()
            empty_sequence = json.dumps({"cellsAreActive": [[False] * 12] * 12})
            cursor.execute(
                """
                INSERT INTO sequences
                VALUES (:name, :data)
                """,
                {"name": sequence_name, "data": empty_sequence},
            )
            connection.commit()
            return {"sequence_name": sequence_name}


@app.route("/sequences-list")
def sequences_list():
    cursor = get_db().cursor()
    names_raw = cursor.execute("""SELECT name FROM sequences""")
    names = [name[0] for name in names_raw]
    sequence_data = {"sequences": names}
    print(sequence_data)
    return sequence_data
