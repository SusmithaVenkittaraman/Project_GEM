import requests
import pandas as pd
from flask import Response
from flask import Flask, jsonify, request
from flask import Flask, render_template, redirect
import json
from sqlalchemy import create_engine
from db_conn import user_name
from db_conn import password
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#################################################
# Flask Setup
#################################################
# Flask Routes
#################################################
# Use flask_pymongo to set up mongo connection
engine = create_engine(f'postgresql://{user_name}:{password}@localhost:5432/gem_db')
connection = engine.connect()

@app.route("/api")
def index():
    # if(request.method == "POST"):
        data = pd.read_sql("SELECT year,financing_for_entrepreneurs FROM framework_conditions WHERE country= 'United States'",connection)
        # data = data.set_index(["financing_for_entrepreneurs"])
        # data = data.set_index(["year"])
        # print(data.values)

        x = []
        y = []

        for index, row in data.iterrows():
            x.append(row["year"])
            y.append(row["financing_for_entrepreneurs"])
        f = {}
        f["year"]=x
        f["financing_for_entrepreneurs"]=y
        print(json.dumps(f))
        # print(data.to_json())
        # json1 = data.to_json()
        # print(json1)
        return json.dumps(f)


if __name__ == '__main__':
    app.run(debug=True)