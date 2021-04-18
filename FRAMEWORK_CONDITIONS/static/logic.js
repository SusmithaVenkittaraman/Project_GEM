
d3.json("http://localhost:5000/country").then(function(data_list) {

  console.log(data_list["country"]);

  d3.select("#selCountry")
    .selectAll("option")
    .data(data_list["country"])
    .enter()
    .append("option")
    .text(function(d) { return d; })
    .property("value",data_list["country"][0])
    .attr("value", function (d, i) {
        return d;
    });
    
  d3.select('#selIndicators').selectAll('label')
  .data(data_list["indicator_keys"]) 
  .enter().append('label')
  .html(function(d, i) {
    return '<br/><input type="checkbox" id="' + data_list["indicator_values"][i] + '"  for="'+ data_list["indicator_values"][i] + '">' + d;
  })

});

function submit_event()
{

  var countries = d3.selectAll("option").nodes()
  // console.log(countries)

  var selected_country

  for(var i = 0; i< countries.length; i++)
  {
    // console.log(countries[i])
    if(countries[i].selected)
    {
      selected_country = countries[i].value;
    }
  }

  console.log(selected_country);

  var selected_indicators = []
  var index= 0
  var checkboxes = d3.selectAll("input").nodes()
  // console.log(c);
  for(var item = 0; item < checkboxes.length; item++)
  {
    if(checkboxes[item].checked)
    {
      console.log(checkboxes[item].id);
      selected_indicators[index] = checkboxes[item].id;
      index ++;
    }
  }
  
  console.log(selected_indicators);
}

d3.json("http://localhost:5000/chart").then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data['labels']);

    let chart = document.getElementById("doughnut-chartcanvas-1")

    var data1 = {
      labels: data['labels'],
      datasets: [{
          label: 'My First Dataset',
          data: data['dataPoints'],
          backgroundColor: [
            '#d00000','#f94144','#f8961e','#90be6d','#43aa8b','#4d908e','#577590','#355070','#0077b6','#00b4d8','#4f000b'],
          hoverOffset: 10
        }]
    }

    var option1 = {
      responsive: true,
      title: {
        display: true,
        position: "bottom",
        text: "Doughnut Chart",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 10
        }
      }
    };

    var chartjs = new Chart(chart, {
      type: "doughnut",
      data: data1,
      options: option1
    });

   

  });