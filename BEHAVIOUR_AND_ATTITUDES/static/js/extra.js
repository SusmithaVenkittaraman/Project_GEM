//adding all the city to dropdown
country_list.forEach(item=>{
    let country_opt=d3.select("#country");
    let country_new_opt=country_opt.append("option")
    country_new_opt.text(item)
});

// function filter_Data(data,country,parameter){
//     var year_list=[];
//     var parameter_values=[];
//     data.forEach(item=>{
//         if(item.country===country){
//             Object.entries(item).forEach(([key, value])=>{
//                 if(key===parameter){
//                     parameter_values.push(value)
//                 }
//                 if(key==='year'){
//                     //console.log(value)
//                     year_list.push(value)
//                 }
//             });
//             }
//         })
//     init(year_list,parameter_values);
// }

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var country = d3.select("#country");
    // Assign the value of the dropdown menu option to a variable
    var country_value = country.property("value");
   
    filter_Data(data,country_value,parameter_value)
}

//d3.selectAll("#country").on("change", updatePlotly);

{/* <li class="filter list-group-item">
                      <label for="country">Enter a Country</label>
                      <div id="country1">
                        <select id="country">
                            <option value="United States" id='country_option'>United States</option>
                          </select>
                    </div>
                    </li> */}