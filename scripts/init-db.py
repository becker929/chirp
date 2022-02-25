import json
import sqlite3

con = sqlite3.connect("../server/server/chirp.db")
cursor = con.cursor()
try:
    cursor.execute("""CREATE TABLE sequences (name varchar(80), data json)""")
except Exception as e:
    print(f"exception while creating table:{e}")
    print("continuing")
finally:
    cursor.execute(
        """
        INSERT INTO sequences VALUES
        ('incredible-shelves', :data)
        """,
        {"data": json.dumps({"cellsAreActive": [[False] * 12] * 12})},
    )
    con.commit()
