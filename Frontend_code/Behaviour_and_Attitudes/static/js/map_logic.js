var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2.55
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/dark-v10",
accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "static/data/behavior_and_attitudes_2019.geojson";

var geojson;

console.log(geoData)

parameters=[]
// Grab data with d3
d3.json(geoData).then(function(data) {
  Object.keys(data.features[0].properties).forEach(item=>{
    parameters.push(item);
});

//removing the parameters not needed for dropdown

parameters.splice(0,4);

//Adding parameters to dropdown
parameters.forEach(item=>{
  item=item.replaceAll('_', ' ');
  let parameters_opt=d3.select("#parameters2");
  let parameters_new_opt=parameters_opt.append("option")
  parameters_new_opt.text(item)
});

});

function plotmap(){

//getting the parameter value
var parameter = d3.select("#parameters2");
var parameter_value=parameter.property("value")


//replacing the selection with hyphens
parameter_value=parameter_value.replaceAll(' ', '_');

d3.json(geoData).then(function(data) {

  console.log(data.features[0].properties[parameter_value])
    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
      // Define what  property in the features to use
      valueProperty: parameter_value,
      
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
  
      // Number of breaks in step range
      steps: 20,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Country: " + feature.properties.country + "<br>"+ parameter_value.replaceAll('_',' ') +"<br>"
         + feature.properties[parameter_value] +"%");
      }
    }).addTo(myMap);

    // var elem = document.getElementsByClassName("info");
    var elem=d3.select(".info")
    elem.remove()
    // var test = d3.select(".leaflet-bottom,.leaflet-right");
    // console.log(test.innerHTML);
    // test.html("");
    // var test = d3.select(".legend");
    // console.log(test);
    // test.html("");
    // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
      // if(div.html()!=""){
      //   div.html("")
      // }
   
  
    var legendInfo = "<h3>"+parameter_value.replaceAll('_',' ')+"</h3>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);



});
}

  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#parameters2").on("change", plotmap);

  //default map
  plotmap()