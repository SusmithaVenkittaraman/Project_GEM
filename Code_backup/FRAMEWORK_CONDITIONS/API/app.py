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
def loadData():

    countries = pd.read_sql("SELECT country FROM framework_conditions GROUP BY country HAVING COUNT(year)>=17 ORDER BY country", connection)

    indicators={
        'Financing for Entrepreneurs':'financing_for_entrepreneurs',
        'Governmental Support and Policies':'governmental_support_and_policies', 
        'Taxes and Bureaucracy':'taxes_and_bureaucracy',
        'Governmental Programs':'governmental_programs',
        'Basic School Entrepreneurial Education and Training':'basic_school_entrepreneurial_education_and_training', 
        'Post School Entrepreneurial Education and Training':'post_school_entrepreneurial_education_and_training', 
        'Research and Development':'research_and_development',
        'Commercial and Professional Infrastructure':'commercial_and_professional_infrastructure',
        'Internal Market Dynamics':'internal_market_dynamics', 
        'Internal Market Openness':'internal_market_openness',
        'Physical and Services Infrastructure':'physical_and_services_infrastructure', 
        'Cultural and Social Norms':'cultural_and_social_norms'}

    country_list = []

    for index, item in countries.iterrows():
        country_list.append(item["country"])

    data_dict = {}

    data_dict["country"] = country_list

    keys = []
    values=[]

    for key in indicators.keys():
        keys.append(key)

    for value in indicators.values():
        values.append(value)
        
    data_dict["indicator_keys"] = keys
    data_dict["indicator_values"] = values

    return json.dumps(data_dict)

@app.route("/chart/<country>")
def doughnutFunction(country):

    countryData = pd.read_sql("SELECT * FROM framework_conditions WHERE country= '"+country+"' AND year=2019",connection)

    labels=['Financing for Entrepreneurs', 'Governmental Support and Policies', 'Taxes and Bureaucracy', 
    'Governmental Programs', 'Basic School Entrepreneurial Education and Training', 
    'Post School Entrepreneurial Education and Training', 'Research and Development', 
    'Commercial and Professional Infrastructure', 'Internal Market Dynamics', 'Internal Market Openness', 
    'Physical and Services Infrastructure', 'Cultural and Social Norms']

    l = ['financing_for_entrepreneurs','governmental_support_and_policies', 'taxes_and_bureaucracy',
       'governmental_programs','basic_school_entrepreneurial_education_and_training', 'post_school_entrepreneurial_education_and_training', 'research_and_development',
       'commercial_and_professional_infrastructure','internal_market_dynamics', 'internal_market_openness','physical_and_services_infrastructure', 'cultural_and_social_norms']
    dataPoints=[]

    for item in l:
        dataPoints.append(countryData[item][0])

    c = {}
    c["labels"]=labels
    c["dataPoints"]=dataPoints

    return json.dumps(c)

@app.route("/bar/<country>/<param1>/<param2>")
def index(country, param1, param2):
    # if(request.method == "POST"):
    data = pd.read_sql("SELECT year,"+ param1 +","+ param2 +" FROM framework_conditions WHERE country= '"+country+"' AND year > 2002 ORDER BY year",connection)
    # data = data.set_index(["financing_for_entrepreneurs"])
    # data = data.set_index(["year"])
    # print(data.values)

    x = []
    y = []

    for index, row in data.iterrows():
        x.append(row["year"])
        y.append(row[param1])
        y.append(row[param2])
    f = {}
    f["year"]=x
    f["points"]=y
    print(json.dumps(f))
    # print(data.to_json())
    # json1 = data.to_json()
    # print(json1)
    return json.dumps(f)


if __name__ == '__main__':
    app.run(debug=True)