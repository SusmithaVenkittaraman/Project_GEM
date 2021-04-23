#dependencies
from flask import Response
from flask import Flask,jsonify,request
from flask import Flask, render_template, redirect
import requests
import json
import pandas as pd
from sqlalchemy import create_engine
from db_config import password
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#engine and creating connection
engine = create_engine(f"postgresql://postgres:{password}@localhost:5432/gem_db")
connection = engine.connect()



@app.route("/")
def index():
    #reading behaviour and attitudes table
    db_BA=pd.read_sql("select * from behavior_and_attitudes",connection)
    db_BA=db_BA.fillna(value='')
    list_BA=[]
    for rows in db_BA.iterrows():
        row_dict={'code':rows[1].code,
                'country':rows[1].country,
                'year':rows[1].year,
                'Perceived_opportunities':rows[1].Perceived_opportunities,
                'Perceived_capabilities':rows[1].Perceived_capabilities,
                'Fear_of_failure_rate':rows[1].Fear_of_failure_rate,
                'Entrepreneurial_intentions':rows[1].Entrepreneurial_intentions,
                'Total_early_stage_Entrepreneurial_Activity':rows[1].Total_early_stage_Entrepreneurial_Activity,
                'Established_Business_Ownership':rows[1].Established_Business_Ownership,
                'Entrepreneurial_Employee_Activity':rows[1].Entrepreneurial_Employee_Activity,
                'Motivational_Index':rows[1].Motivational_Index,
                'Female_Male_TEA':rows[1].Female_Male_TEA,
                'Female_Male_Opportunity_Driven_TEA':rows[1].Female_Male_Opportunity_Driven_TEA,
                'High_Job_Creation_Expectation':rows[1].High_Job_Creation_Expectation,
                'Innovation':rows[1].Innovation,
                'Business_Services_Sector':rows[1].Business_Services_Sector,
                'High_Status_to_Successful_Entrepreneurs':rows[1].High_Status_to_Successful_Entrepreneurs,
                'Entrepreneurship_as_a_Good_Career_Choice':rows[1].Entrepreneurship_as_a_Good_Career_Choice
                }
        list_BA.append(row_dict)
    print(f"The number of data points:{len(list_BA)}")
    return jsonify(list_BA)

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
def barchart(country, param1, param2):
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

if __name__ == "__main__":
    app.run(debug=True)