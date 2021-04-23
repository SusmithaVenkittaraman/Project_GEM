var queryURL="http://127.0.0.1:5000/"
d3.json(queryURL).then(function(data){
    console.log(data);
    plotting(data)
})

function plotting(data){
//finding the unique countries
country_list=[];
data.forEach(item=>{
    if(country_list.includes(item.country)===false){
        country_list.push(item.country)
     }
});

//having it as select boxes
var select_div=d3.select("#country2");
country_list.forEach(item=>{
    select_div.append("input").attr("type","checkbox").attr("class","checkbox").attr("name",item).attr("value",item)
    let label=select_div.append("label").attr("for",item)
    label.text(item)
    select_div.append("br")
});

//finding the different parameters for dropdown
parameters=[]

Object.keys(data[0]).forEach(item=>{
    parameters.push(item);
});

//eleminating few not required parameters
parameters.splice(15,3);
parameters.splice(13,1);

//Adding parameters to dropdown
parameters.forEach(item=>{
    item=item.replaceAll('_', ' ');
    let parameters_opt=d3.select("#parameters");
    let parameters_new_opt=parameters_opt.append("option")
    parameters_new_opt.text(item)
});

//filtering data and plotting the chart
function filter_Data(data,country,parameter){
    parameter=parameter.replaceAll(' ','_')
    console.log(country)
    var all_year_list=[];
    var all_parameter_values=[];
    for(var i=0;i<country.length;i++){
            var year_list=[];
            var parameter_values=[];
        data.forEach(item=>{
        if(item.country===country[i]){
            Object.entries(item).forEach(([key, value])=>{
                if(key===parameter){
                    parameter_values.push(value)
                }
                if(key==='year'){
                    year_list.push(value)
                }
            });
            }
        })
        all_year_list.push(year_list);
        all_parameter_values.push(parameter_values);
        }
    init(all_year_list,all_parameter_values,country,parameter);
}

//plotting initial chart
filter_Data(data,['United States'],'Perceived_opportunities')


function updatePlotly(){
    countries_checked=[]
    var boxes = d3.selectAll("input.checkbox:checked");
    
    boxes.each(function() {
        if(countries_checked.includes(this.value)===false){
        countries_checked.push(this.value)
        }
  })
  var parameter = d3.select("#parameters");
  var parameter_value=parameter.property("value")
  filter_Data(data,countries_checked,parameter_value)
}

function buttonclick(){
    //console.log("Reset clcicked");
    var boxes = d3.selectAll("input.checkbox:checked");
    boxes.each(function(){
        if(this.value!='United States'){
            $(this).prop('checked', false);
        }
    })
    //plotting initial chart
    filter_Data(data,['United States'],'Perceived_opportunities')
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#parameters").on("change", updatePlotly);
d3.selectAll("#country2").on("change",updatePlotly);
d3.selectAll("#resetbutton").on("click",buttonclick);
}
function init(year,parameter_values,country,parameter){
    parameter=parameter.replaceAll('_',' ');
    var data = [];
    for(var i=0;i<year.length;i++){
    var trace = {
        x: year[i],
        y: parameter_values[i],
        type: 'scatter',
        name: country[i]
      };
    data.push(trace)
    }
    var layout = {
        title:`Time series : Country Vs ${parameter}`,
        xaxis: {
            title: 'Year',
          },
          yaxis: {
            title: `${parameter}`,
          }
      };
      Plotly.newPlot('lineplot', data,layout);
}

