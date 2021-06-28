function switchLayerDesc(layer) {
  var layerId = document.getElementById("layerinput").value;
  
  switch(layerId) {
  case "total_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average annual carbon footprint per person for each LSOA. Based on a mix of local and national data. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details. </p>`;
    break;
  case "car_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average carbon footprint per person from driving cars. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "van_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average carbon footprint per person from driving vans. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "gas_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average carbon footprint per person from domestic gas consumption. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "elec_emissions_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average carbon footprint per person from domestic electricity consumption. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "other_heating_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average carbon footprint per person from domestic heating which does not use mains gas or electricity, e.g. coal, oil, wood. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "consumption_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Estimated average carbon footprint per person from consumption of goods and services. Each area has a grade from A+ (low emissions) to F- (high emissions) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "cars_percap_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The number of cars per person in 2018. Each area has a grade from A+ (low car ownership) to F- (high car ownership) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "km_percap_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The number of kilometres driven per person in 2018. Each area has a grade from A+ (low) to F- (high) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "T2W_Car_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The proportion of people who travel to work by car in 2011. Each area has a grade from A+ (low) to F- (high) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "T2W_Cycle_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The proportion of people who travel to work by bicycle in 2011. Each area has a grade from A+ (high) to F- (low) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "T2W_Bus_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The proportion of people who travel to work by bus in 2011. Each area has a grade from A+ (high) to F- (low) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "T2W_Train_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The proportion of people who travel to work by train in 2011. Each area has a grade from A+ (high) to F- (low) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "T2W_Foot_grade":
    document.getElementById("layerdesc").innerHTML = `<p>The proportion of people who travel to work on foot in 2011. Each area has a grade from A+ (high) to F- (low) in comparison to the England average. See the popup report for more details.</p>`;
    break;
  case "EPCScore":
    document.getElementById("layerdesc").innerHTML = `<p>The average Energy Performance Certificate score (1 – 100) for domestic buildings. Note not all homes have an EPC certificate. See the popup report for more details.</p>`;
    break;
  case "low_energy_light":
    document.getElementById("layerdesc").innerHTML = `<p>The percentage of lights which have low energy bulbs such as LEDs based on Energy Performance Certificates</p>`;
    break;
  case "floor_area_avg":
    document.getElementById("layerdesc").innerHTML = `<p>The average floor area of homes based on Energy Performance Certificates</p>`;
    break;
  case "SOAC11NM":
    document.getElementById("layerdesc").innerHTML = `<p>The Office for National Statistics <a href="https://www.ons.gov.uk/methodology/geography/geographicalproducts/areaclassifications/2011areaclassifications" target="_blank"> Area Classifications</a>. These are based on the 2011 Census and group similar areas based on social, economic, and demographic factors. Each group has a <a href="https://www.ons.gov.uk/methodology/geography/geographicalproducts/areaclassifications/2011areaclassifications/penportraitsandradialplots" target="_blank">pen portrait</a>.</p>`;
    break;
   case "flights_grade":
    document.getElementById("layerdesc").innerHTML = `<p>Modeled carbon emissions for domestic and international flights in 2018 based on travel patterns and household income.</p>`;
    break;
  default:
    document.getElementById("layerdesc").innerHTML = `<p>No Description</p>`;
  } 
}