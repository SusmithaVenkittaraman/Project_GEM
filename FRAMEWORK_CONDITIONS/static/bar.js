
// Define SVG area dimensions
var svgWidth = 700;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

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

  var barSpacing = 10; // desired space between each bar
//   var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (data["year"].length - 1))) / data["year"].length;

  // @TODO
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(data["financing_for_entrepreneurs"])
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", barWidth)
    .attr("height", d => d * 50)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d =>chartHeight - d * 50);
})
// .catch(function(error) {
//   console.log(error);
// });
