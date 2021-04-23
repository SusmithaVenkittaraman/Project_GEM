var queryURL="http://127.0.0.1:5000/"

var tbody=d3.select("tbody")

d3.json(queryURL).then(function(data){
        data.forEach(item =>{
        let row=tbody.append("tr");
        row_dict={'code':0,
                'country':'',
                'year':'',
                'Perceived_opportunities':0,
                'Perceived_capabilities':0,
                'Fear_of_failure_rate':0,
                'Entrepreneurial_intentions':0,
                'Total_early_stage_Entrepreneurial_Activity':0,
                'Established_Business_Ownership':0,
                'Entrepreneurial_Employee_Activity':0,
                'Motivational_Index':0,
                'Female_Male_TEA':0,
                'Female_Male_Opportunity_Driven_TEA':0,
                'High_Job_Creation_Expectation':0,
                'Innovation':0,
                'Business_Services_Sector':0,
                'High_Status_to_Successful_Entrepreneurs':0,
                'Entrepreneurship_as_a_Good_Career_Choice':0
                }
        Object.entries(item).forEach(([key,value])=>{
            row_dict[key]=value;
        });
        Object.entries(row_dict).forEach(([key,value])=>{
            let cell=row.append("td");
            cell.text(value);
        });

    });
});




