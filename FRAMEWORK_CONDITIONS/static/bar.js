
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

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json("http://localhost:5000/api").then(function(data){

  // Print the tvData
//   console.log(data);
  console.log(data["year"]);
  console.log(data["financing_for_entrepreneurs"])

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
    .data(data["financing_for_entrepreneurs"])
    .enter()
    .append("rect")
    // .classed("bar", true)
    .attr("class",function(d, i) { if(i%2 ==0) return "bar1"; else return "bar2";})
    .attr("width", barWidth/2)
    .attr("height", d => d * 100)
    .attr("x", function(d, i) { if(i%2 ==0) return(i * barWidth + barSpacing); else return ((i-1) * barWidth + barWidth/2 + 7);})
    .attr("y", d => chartHeight - d * 100);
    
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([10, 0])
    .html(function(d) {
      return (`<br>value: ${d}`);
    });

  // Step 7: Create tooltip in the chart
  // ==============================
  chartGroup.call(toolTip);

  // Step 8: Create event listeners to display and hide the tooltip
  // ==============================
  barGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });
})
// .catch(function(error) {
//   console.log(error);
// });