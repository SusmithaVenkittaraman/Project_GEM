

d3.json("http://localhost:5000/api").then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data);

    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 13
      });
    
    
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY
      }).addTo(myMap);
      
      // Create a new marker
      // Pass in some initial options, and then add it to the map using the addTo method
      var marker = L.marker([45.52, -122.67], {
        draggable: true,
        title: "My First Marker"
      }).addTo(myMap);
      
  });