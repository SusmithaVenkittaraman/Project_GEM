// '#d00000','#f94144','#f8961e','#ffd400','#90be6d','#43aa8b','#4d908e','#577590','#355070','#0077b6','#00b4d8','#4cc9f0'],

var dict_colors = {
  'Financing for Entrepreneurs': "#d00000",
  'Governmental Support and Policies':"#f94144",
  'Taxes and Bureaucracy':"#f8961e",
  'Governmental Programs':"#ffd400",
  'Basic School Entrepreneurial Education and Training':"#90be6d",
  'Post School Entrepreneurial Education and Training':"#43aa8b",
  'Research and Development':"#4d908e",
  'Commercial and Professional Infrastructure':"#577590",
  'Internal Market Dynamics':"#355070",
  'Internal Market Openness':"#0077b6",
  'Physical and Services Infrastructure':"#00b4d8",
  'Cultural and Social Norms':"#4cc9f0"
}

var indicators={
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

function barChart(country, param1, param2)
{
// Define SVG area dimensions
var svgWidth = 1095;
var svgHeight = 520;

// Define the chart's margins as an object
var chartMargin = {
  top: 10,
  right: 30,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom + 9.5;

var svg = d3
  .select("#bar")

svg.html("")
// Select body, append SVG area to it, and set the dimensions
svg = d3
  .select("#bar")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json("http://localhost:5000/bar/"+ country+ "/" + indicators[param1] + "/" + indicators[param2]).then(function(data){

  // Print the tvData
//   console.log(data);
  console.log(data["year"]);
  console.log(data["points"])

  var barSpacing = 5; // desired space between each bar
//   var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
 // var barWidth = (chartWidth - (barSpacing * (data["year"].length - 1))) / data["year"].length;
  var barWidth = 30;
  // @TODO
  // Create code to build the bar chart using the tvData.
//   j = 0
//   var a = []
//   for (i = 0; i < data["financing_for_entrepreneurs"].length; i++) {
//     a[j] = data["financing_for_entrepreneurs"][i];
//     j = j +1;
//     a[j] = data["financing_for_entrepreneurs"][i];
//     j = j + 1;
//   }

// scale y to chart height
var yScale = d3.scaleLinear()
  .domain([0, 5])
  .range([chartHeight, 0]);

// scale x to chart width
var xScale = d3.scaleBand()
  .domain(data["year"])
  .range([0, chartWidth]);
  // .padding(0.10);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);
  // .text("Years");

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);
  // .text("Points")

  var barGroup = chartGroup.selectAll(".bar")
    .data(data["points"])
    .enter()
    .append("rect")
    .attr("fill",function(d, i) { if(i%2 ==0) return dict_colors[param1]; else return dict_colors[param2];})
    // .attr("hover","white")
    // .attr("class",function(d, i) { if(i%2 ==0) return "bar1"; else return "bar2";})
    .attr("width", barWidth/2)
    .attr("height", d => d * 95)
    .attr("x", function(d, i) { if(i%2 ==0) return(i * barWidth + barSpacing + 5); else return ((i-1) * barWidth + barWidth/2 + 12);})
    .attr("y", d => chartHeight - d * 95)
    // .attr('opacity', '.8');   

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(function(d) {
      return (d);
      // return (`<br>value: ${d}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  barGroup.on("mouseover", function(data) {
    d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '.5')
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
    d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '1');        
      toolTip.hide(data);
    });
})

chartGroup.selectAll("rect")
  .transition()
  .duration(900)
  .attr("y", d => chartHeight - d * 95)
  .attr("height", d => d * 95)
  .delay(function(d,i){console.log(i) ; return(i*100)})


  chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2) - 10)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Likert scale (1-Very Poor to 5-Excellent)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 35})`)
      .attr("class", "axisText")
      .text("Years");

      chartGroup.append('rect')  
        .data(param1)                                    
        .attr('width', 20)                           
        .attr('height', 10)  
        .attr('x', 600)               
        .attr('y', 0)                          
        .style('fill', dict_colors[param1])                                 
        .style('stroke', "grey");                                 
        
        chartGroup.append('text')
        // .data(param1)                                      
        .attr('x', 625)               
        .attr('y', 10)           
        .text(param1);  
        
        chartGroup.append('rect')  
        .data(param2)                                    
        .attr('width', 20)                           
        .attr('height', 10)  
        .attr('x', 600)               
        .attr('y', 15)                          
        .style('fill', dict_colors[param2])                                 
        .style('stroke', "grey");                                 
        
        chartGroup.append('text')
        // .data(param1)                                      
        .attr('x', 625)               
        .attr('y', 25)           
        .text(param2); 

// .catch(function(error) {
//   console.log(error);
// });
}
