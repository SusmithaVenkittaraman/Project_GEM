// '#d00000','#f94144','#f8961e','#ffd400','#90be6d','#43aa8b','#4d908e','#577590','#355070','#0077b6','#00b4d8','#4cc9f0'],

var dict_colors = {
  'financing_for_entrepreneurs': "#d00000",
  'governmental_support_and_policies':"#f94144",
  'taxes_and_bureaucracy':"#f8961e",
  'governmental_programs':"#ffd400",
  'basic_school_entrepreneurial_education_and_training':"#90be6d",
  'post_school_entrepreneurial_education_and_training':"#43aa8b",
  'research_and_development':"#4d908e",
  'commercial_and_professional_infrastructure':"#577590",
  'internal_market_dynamics':"#355070",
  'internal_market_openness':"#0077b6",
  'physical_and_services_infrastructure':"#00b4d8",
  'cultural_and_social_norms':"#4cc9f0"
}



function barChart(country, param1, param2)
{
// Define SVG area dimensions
var svgWidth = 1070;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 30
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
d3.json("http://localhost:5000/bar/"+ country+ "/" + param1 + "/" + param2).then(function(data){

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
  .range([0, chartWidth])
  .padding(0.15);

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);

  var barGroup = chartGroup.selectAll(".bar")
    .data(data["points"])
    .enter()
    .append("rect")
    .attr("fill",function(d, i) { if(i%2 ==0) return dict_colors[param1]; else return dict_colors[param2];})
    // .attr("hover","white")
    // .attr("class",function(d, i) { if(i%2 ==0) return "bar1"; else return "bar2";})
    .attr("width", barWidth/2)
    .attr("height", d => d * 95)
    .attr("x", function(d, i) { if(i%2 ==0) return(i * barWidth + barSpacing); else return ((i-1) * barWidth + barWidth/2 + 7);})
    .attr("y", d => chartHeight - d * 95)
  //   .on('mouseover', function (d, i) {
  //       d3.select(this).transition()
  //            .duration('50')
  //            .attr('opacity', '.85')});
  //  .on('mouseout', function (d, i) {
  //       d3.select(this).transition()
  //            .duration('50')
  //            .attr('opacity', '1')});


    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([10, 10])
    .html(function(d) {
      return (`<br>value: ${d}`);
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
// .catch(function(error) {
//   console.log(error);
// });
}
