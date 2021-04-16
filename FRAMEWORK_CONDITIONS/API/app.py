import requests
import pandas as pd
from flask import Response
from flask import Flask, jsonify, request
from flask import Flask, render_template, redirect

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
        data = pd.read_sql("select * from framework_conditions",connection)

        print(data)
        return data.to_dict()


if __name__ == '__main__':
    app.run(debug=True)