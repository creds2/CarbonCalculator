function switchLayerDesc(layer) {
  var layerId = document.getElementById("layerinput").value;
  
  switch(layerId) {
  case "total_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated avearge total carbon footprint per person. Based on Gas consumption, Electiricty consumption, and miles driven in cars.</p>`;
    break;
  case "car_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated avearge carbon footprint per person from driving cars. Emissions account for mileage driven by cars which are registed in each LSOA and the average CO2 per km of cars in that LSOA. Mileage data from the 2011 MOTering Along project.</p>`;
    break;
  default:
    document.getElementById("layerdesc").innerHTML = `<p>No Description</p>`;
  } 
}