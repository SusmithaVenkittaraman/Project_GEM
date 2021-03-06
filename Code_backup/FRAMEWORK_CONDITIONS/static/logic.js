 
  var btn_toggle = document.getElementById("btn_toggle")
  btn_toggle.style.display = "none";

  var selected_country = "";
  // var selected_country = "United States";
  // var selected_indicators=[]

  // selected_indicators[0]="Financing for Entrepreneurs";
  // selected_indicators[1]="Governmental Support and Policies";

  function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
  }

  // Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    colors[index] = color.length === 9 ? color.slice(0, -2) : color;
  });
  legend.chart.update();
}

d3.json("http://localhost:5000/api").then(function(data_list) {

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
  // .append('br')
  .enter()
  .append('label')
  .html(function(d, i) {
    // if(i != 0)
    // {
      return '<input type="checkbox" id="' + data_list["indicator_keys"][i] + '"  for="'+ data_list["indicator_values"][i] + '"> ' + d;
    // }
    // else
    // {
    //   return '<input type="checkbox" id="' + data_list["indicator_values"][i] + '"  for="'+ data_list["indicator_values"][i] + '">' + d;
    // }
  })
  // .append('br')

  // d3.select('#selIndicators').selectAll('label').append('br')
  // list.append('br')
});

function submit_country()
{

  var checkboxes = d3.selectAll("input").nodes()
  console.log(checkboxes);
  for(var item = 0; item < checkboxes.length; item++)
  {
    checkboxes[item].checked = false; 
  }

  var svg = d3
  .select("#bar")

  svg.html("")
  
  var countries = d3.selectAll("option").nodes()
  // console.log(countries)

  for(var i = 0; i< countries.length; i++)
  {
    // console.log(countries[i])
    if(countries[i].selected)
    {
      if(countries[i].value != "Select")
      {
        selected_country = countries[i].value;
      }
      else
      {
        alert("Please Select Country");
        return;
      }
    }
  }

  console.log(selected_country);

d3.json("http://localhost:5000/chart/"+selected_country).then(function(data) {

    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data['labels']);

    if(window.myNewChart1 != null){
      window.myNewChart1.destroy();
  }

    var chart = document.getElementById("doughnut-chartcanvas-1")

    console.log(window.myNewChart1);
    // var a = [dict_colors[x] for (x in dict_colors)];

    var data1 = {
      labels: data['labels'],
      datasets: [{
          label: 'My First Dataset',
          data: data['dataPoints'],
          backgroundColor:Object.values(dict_colors),
          // [ '#d00000','#f94144','#f8961e','#ffd400','#90be6d','#43aa8b','#4d908e','#577590','#355070','#0077b6','#00b4d8','#4cc9f0'],
          hoverOffset: 10
        }]
    }

    var option1 = {
      responsive: true,
      cutout: "50%",
      plugins: {
        legend: {
         // itemMaxWidth: 50,
         // itemWrap: true,
          position: 'right',
          onHover: handleHover,
          onLeave: handleLeave,
          labels: {
            usePointStyle: true
          }
        },
        title: {
          display: true,
          position:"top",
          text: "Distribution of Indicators for " + selected_country,
          labels: {
                  fontColor: "#333",
                  fontSize: 15
                }
        },
      },
      // elements: {
      //   arc: {
      //     backgroundColor: colorize.bind(null, false, false),
      //     hoverBackgroundColor: hoverColorize
      //   }
      // },
      rotation: 0,
      layout: {
        padding:{
           left: 30,
           top:20
          },
        margin:
        {
          top:0
        }
    }
    };

    window.myNewChart1 = new Chart(chart, {
      type: "doughnut",
      data: data1,
      options: option1
    });
  });

  var btn_toggle = document.getElementById("btn_toggle")
  btn_toggle.style.display = "block";
  // btn_toggle.disabled=false;
  // if (window.myNewChart1.options.cutout) {
  //   window.myNewChart1.options.cutout = 0;
  // } else {
  //   window.myNewChart1.options.cutout = '50%';
  // }
  // window.myNewChart1.update();
}

function submit_indicators()
{
  if(selected_country === "")
  {
    alert("Please select Country.")
    return;
  }

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

  if(index != 2)
  {
    alert("Please Select 2 Indicators")
    return;
  }
  
  console.log(selected_indicators);

  barChart(selected_country, selected_indicators[0],selected_indicators[1])
}


function reset_event()
{
  var countries = d3.selectAll("option").nodes()
  console.log(countries)

  for(var i = 0; i< countries.length; i++)
  {
    // console.log(countries[i])
    if(countries[i].selected)
    {
      if(countries[i].value === "Select")
      {
        countries[i].selected = true;
      }
      else
      {
        countries[i].selected = false;
      }
    }
  }

  // var selected_indicators = []
  // var index= 0
  var checkboxes = d3.selectAll("input").nodes()
  console.log(checkboxes);
  for(var item = 0; item < checkboxes.length; item++)
  {
    checkboxes[item].checked = false; 
  }

  if(window.myNewChart1 != null){
    window.myNewChart1.destroy();
  }

  var svg = d3
  .select("#bar")

  svg.html("")
  
  var btn_toggle = document.getElementById("btn_toggle")
  btn_toggle.style.display = "none";
}

function changeType()
{
  if (window.myNewChart1.options.cutout) 
  {
    window.myNewChart1.options.cutout = 0;
  } 
  else 
  {
    window.myNewChart1.options.cutout = '50%';
   }

   if (window.myNewChart1.options.rotation >= 30)
   {
    window.myNewChart1.options.rotation= 0;
   }
   else
   {
   window.myNewChart1.options.rotation= 30;
   }

   console.log(window.myNewChart1.options.rotation);
   window.myNewChart1.update();
}