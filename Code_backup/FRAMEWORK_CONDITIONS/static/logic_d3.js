// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

var chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Initial Params
var chosenXAxis = "United States";
var chosenYAxis = "Financing_for_entrepreneurs";

// function used for updating x-scale var upon click on axis label
// function xScale(data, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([0,10])
//     .range([0, chartWidth]);

//   return xLinearScale;

// }

// // function used for updating x-scale var upon click on axis label
// function yScale(data, chosenYAxis) {
//   // create scales

// //   console.log(d3.map(data, d => d[chosenYAxis]));
// //   console.log("max",d3.max(data, d => d[chosenYAxis]));

  
//   var yLinearScale = d3.scaleLinear()
//                     .domain([0,10])
//                     //.domain([0,40])
//                     .range([chartHeight, 0]);

//   return yLinearScale;
// }

// function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) 
// {
//   var bAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bAxis);

//   return xAxis;
// }

// // function used for updating xAxis var upon click on axis label
// function renderYAxes(newYScale, yAxis) 
// {
//   var bYxis = d3.axisLeft(newYScale);

//   yAxis.transition()
//     .duration(1000)
//     .call(bYxis);

//   return yAxis;
// }

// function used for updating circles group with a transition to
// new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis, attrValue) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr(attrValue, d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }

// function renderCircleText(circleTextGroup, newXScale, chosenXAxis, attrValue) {

//   circleTextGroup.transition()
//                 .duration(1000)
//                 .attr(attrValue, d => newXScale(d[chosenXAxis]));

//   return circleTextGroup;
// }

// function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

//   var xlabel;
//   var ylabel;

//   if (chosenXAxis === "poverty") {
//     xlabel = "Poverty";
//   }
//   else if(chosenXAxis === "age"){
//     xlabel = "Age";
//   }
//   else {
//     xlabel = "Income";
//   }

//   if (chosenYAxis === "obesity") {
//     ylabel = "Obesity";
//   }
//   else if(chosenYAxis === "healthcare"){
//     ylabel = "Healthcare";
//   }
//   else {
//     ylabel = "Smokes";
//   }

//   var toolTip = d3.tip()
//   .attr("class", "tooltip")
//   .offset([-5, -5])
//   .html(function(d) {
//     return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}%<br>${ylabel}: ${d[chosenYAxis]}%`);
//   });

//   // Step 7: Create tooltip in the chart
//   // ==============================
//   chartGroup.call(toolTip);

//   // Step 8: Create event listeners to display and hide the tooltip
//   // ==============================
//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data, this);
//   })
//   // onmouseout event
//   .on("mouseout", function(data, index) {
//     toolTip.hide(data);
//   });

//   return circlesGroup;
// }

d3.json("http://localhost:5000/api").then(function(data)
{
   
    console.log(data);
    console.log(data['financing_for_entrepreneurs']);
        // console.log(d3.map(data, d => d[chosenYAxis]));
    // var data_US = data.filter(function(d) 
    // {
    //     console.log(d);
    //     return d.Country == "United States"});
    // console.log(data_US);

    var xLinearScale = xScale(data, chosenXAxis);

//    // scale y to chart height
   var yLinearScale = yScale(data, chosenYAxis);

//     // create axes
    var leftAxis = d3.axisLeft(yLinearScale);
    var bottomAxis = d3.axisBottom(xLinearScale);

//     // set x to the bottom of the chart
    var xAxis = chartGroup.append("g")
                .classed("x-axis", true)
                .attr("transform", `translate(0, ${chartHeight})`)
                .call(bottomAxis);

//     // set y to the y axis
    var yAxis = chartGroup.append("g")
                .call(leftAxis);

    chartGroup.selectAll("rect")
    .data(data['financing_for_entrepreneurs'])
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", function(data) {
        return data * 10;
    })
    .attr("x", function(data, index) {
        return index * 60;
    })
    .attr("y", function(data) {
        return 600 - data * 10;
    })
    .attr("class", "bar");
    // var circlesGroup = chartGroup.selectAll("circle")
    //             .data(data)
    //             .enter()
    //             .append("circle")
    //             .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //             .attr("cy", d => yLinearScale(d[chosenYAxis]))
    //             .attr("r","8")
    //             .attr("fill", "pink")
                // .text(function(d){return d.abbr})
                // .attr("text",function(d){return d.abbr});
                

    // var circleTextGroup = chartGroup.selectAll("circle")
    //             .select("text")
    //             .data(data)
    //             .enter()
    //             .append("text")
    //             .attr("dx", d => xLinearScale(d[chosenXAxis]))
    //             .attr("dy", d => yLinearScale(d[chosenYAxis]))
    //             // .text(function(d){return d.abbr})
    //             .attr("font-size",8);

  // Create group for two x-axis labels
  var xlabelsGroup = chartGroup.append("g")
                                  .attr("transform", `translate(${svgWidth / 2 - 40}, ${svgHeight - 80})`);

  xlabelsGroup.append("text")
              .attr("x", 0)
              .attr("y", 20)
              .attr("value", "2019") // value to grab for event listener
              .classed("inactive", true)
              .text("Year");

// xlabelsGroup.append("text")
//             .attr("x", 0)
//             .attr("y", 40)
//             .attr("value", "age") // value to grab for event listener
//             .classed("active", true)
//             .text("Age (Median)");

// xlabelsGroup.append("text")
//             .attr("x", 0)
//             .attr("y", 60)
//             .attr("value", "income") // value to grab for event listener
//             .classed("active", true)
//             .text("Household Income (Median)");


    // Create group for 3 y-axis labels
    var ylabelsGroup = chartGroup.append("g")
    .attr("transform", `rotate(-90) translate(${0 - (chartHeight / 2) }, ${ 0 - chartMargin.left - 5})`);

    ylabelsGroup.append("text")
                .attr("x", 0)
                .attr("y", 20)
                .attr("value", "Financing_for_entrepreneurs") // value to grab for event listener
                .classed("inactive", true)
                .text("Financing for entrepreneurs");
               

    // ylabelsGroup.append("text")
    //             .attr("x", 0)
    //             .attr("y", 40)
    //             .attr("value", "smokes") // value to grab for event listener
    //             .classed("active", true)
    //             .text("Smokes (%)");

    // ylabelsGroup.append("text")
    //             .attr("x", 0)
    //             .attr("y", 60)
    //             .attr("value", "healthcare") // value to grab for event listener
    //             .classed("inactive", true)
    //             .text("Lacks Healthcare (%)");

    // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // x axis labels event listener
//   xlabelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");

//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         console.log(chosenXAxis);

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(data, chosenXAxis);

//         // updates x axis with transition 
//         bottomAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, "cx");

//         circleTextGroup = renderCircleText(circleTextGroup, xLinearScale, chosenXAxis, "dx");
//         //console.log(circleTextGroup);
//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
//         //circleTextGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
        
//         // changes classes to disable selected axis and enable others
//         xlabelsGroup.selectAll("text").attr("class","active");
//         d3.select(this).attr("class", "inactive")
//       }
//     });

     // y axis labels event listener
//   ylabelsGroup.selectAll("text")
//   .on("click", function() {
//     // get value of selection
//     var value = d3.select(this).attr("value");

//     if (value !== chosenYAxis) {

//       // replaces chosenXAxis with value
//       chosenYAxis = value;

//       console.log(chosenYAxis);

//       // functions here found above csv import
//       // updates x scale for new data
//       yLinearScale = yScale(data, chosenYAxis);

//       // updates x axis with transition 
//       leftAxis = renderYAxes(yLinearScale, yAxis);

//       // updates circles with new x values
//       circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis, "cy");

//       circleTextGroup = renderCircleText(circleTextGroup, yLinearScale, chosenYAxis, "dy");
//       //console.log(circleTextGroup);
//       // updates tooltips with new info
//       circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
//       //circleTextGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
      
//       // changes classes to disable selected axis and enable others
//       ylabelsGroup.selectAll("text").attr("class","active");
//       d3.select(this).attr("class", "inactive")
//     }
//   });
})
// .catch(function(error) {
//     console.log(error);
//   });