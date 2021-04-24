#dependencies
from flask import Flask,jsonify
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

if __name__ == "__main__":
    app.run(debug=True)