import sqlite3
con = sqlite3.connect("../server/server/chirp.db")
cursor = con.cursor()
cursor.execute("""CREATE TABLE sequences (name varchar(80), data json)""")
