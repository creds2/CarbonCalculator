function switchLayerDesc(layer) {
  var layerId = document.getElementById("layerinput").value;
  
  switch(layerId) {
  case "total_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated avearge total carbon footprint per person. Based on Gas consumption, Electiricty consumption, and miles driven in cars.</p>`;
    break;
  case "car_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated avearge carbon footprint per person from driving cars. Emissions account for mileage driven by cars which are registed in each LSOA and the average CO2 per km of cars in that LSOA. Mileage data from the 2011 MOTering Along project.</p>`;
    break;
  case "gas_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Emissions from domestic gas consuption. THis is mostly due to domestic gas boilers for heating and hot water.</p>`;
    break;
  case "elec_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Emissions from domestic electricity consuption.</p>`;
    break;
  case "cars_percap_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The numer of cars per person. Higher car ownnership is known to lead to increased driving, and thus increased emissions.</p>`;
    break;
  default:
    document.getElementById("layerdesc").innerHTML = `<p>No Description</p>`;
  } 
}