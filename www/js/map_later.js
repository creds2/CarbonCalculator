// Popup LSOA ID
// Create a popup, but don't add it to the map yet.
var centpopup = new maplibregl.Popup({
closeButton: false,
closeOnClick: false
});
 
map.on('mouseenter', 'centroids', function (e) {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
 
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.code;

// Populate the popup and set its coordinates
// based on the feature found.
centpopup.setLngLat(coordinates).setHTML(description).addTo(map);
});
 
map.on('mouseleave', 'centroids', function () {
map.getCanvas().style.cursor = '';
centpopup.remove();
});


// Click on Transit transitstops
map.on('click', 'transitstops', function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var stop_name = e.features[0].properties.stop_name;
var stop_grade = e.features[0].properties.grade;
var stops_per_week = e.features[0].properties.stops_per_week;
var stop_id = e.features[0].properties.stop_id;
var stops_total = e.features[0].properties.stops_total;

var description = '<p><b>' + stop_name + '</b></p>' +
'<p> Stop id: ' + stop_id + '</p>' +
'<p> Frequency Grade: ' + stop_grade + '</p>' +
'<p> Stops per week: ' + stops_per_week + '</p>' +
'<p> Stops total: ' + stops_total + '</p>';
 
new maplibregl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});

// Click on postcode
map.on('click', 'postcode', function (e) {
var coordinates = e.lngLat;
var POSTCODE = e.features[0].properties.POSTCODE;
var gas_meters = e.features[0].properties.gas_meters;
var elec_meters = e.features[0].properties.elec_meters;
var gas_kwh_median = Number(e.features[0].properties.gas_kwh_median);
var gas_kwh_mean = Number(e.features[0].properties.gas_kwh_mean);
var gas_kwh_total = Number(e.features[0].properties.gas_kwh_total);
var elec_kwh_mean = Number(e.features[0].properties.elec_kwh_mean);
var elec_kwh_median = Number(e.features[0].properties.elec_kwh_median);
var elec_kwh_total = Number(e.features[0].properties.elec_kwh_total);
var cost_gas_2023 = Math.round(103.99 + gas_kwh_median * 0.103);
var cost_gas_2022 = Math.round(99.35 + gas_kwh_median * 0.0737);
var cost_elec_2023 = Math.round(169.21 + elec_kwh_median * 0.34);
var cost_elec_2022 = Math.round(165.49 + elec_kwh_median * 0.2834);

var description = '<div class="epcbox"><p> Postcode: ' + POSTCODE + '</p>' +
'<p><b>Number of meters</b></p>' +
'<p> Gas: ' + gas_meters + '</p>' +
'<p> Electricity: ' + elec_meters + '</p>' +
'<p><b>Annual gas consumption</b></p>' +
'<p> Median: ' + gas_kwh_median + ' kWh</p>' +
'<p> Mean: ' + gas_kwh_mean + ' kWh</p>' +
'<p> Total: ' + gas_kwh_total + ' kWh</p>' +
'<p><b>Annual electricity consumption</b></p>' +
'<p> Median: ' + elec_kwh_median + ' kWh</p>' +
'<p> Mean: ' + elec_kwh_mean + ' kWh</p>' +
'<p> Total: ' + elec_kwh_total + ' kWh</p>' +
'<p><b>Typical annual bills</b></p>' +
'<p>Before/After October 2022</p>' +
'<p> Gas: £' + cost_gas_2022 + ' / £' + cost_gas_2023 + '</p>' +
'<p> Electricity: £' + cost_elec_2022 + ' / £' + cost_elec_2023 + '</p></div>';

 

new maplibregl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});
 
// Click on epc
map.on('click', 'epc', function (e) {
var coordinates = e.lngLat;
var addr = e.features[0].properties.addr;
var cur_rate = e.features[0].properties.cur_rate;
var cur_ee = e.features[0].properties.cur_ee;
var per_ee = e.features[0].properties.per_ee;
var tenure = e.features[0].properties.tenure;
var age = e.features[0].properties.age;
var area = e.features[0].properties.area;
var water_d = e.features[0].properties.water_d;
var water_ee = e.features[0].properties.water_ee;
var wind_d = e.features[0].properties.wind_d;
var wind_ee = e.features[0].properties.wind_ee;
var wall_d = e.features[0].properties.wall_d;
var wall_ee = e.features[0].properties.wall_ee;
var floor_ee = e.features[0].properties.floor_ee;
var roof_d = e.features[0].properties.roof_d;
var roof_ee = e.features[0].properties.roof_ee;
var heat_d = e.features[0].properties.heat_d;
var heat_ee = e.features[0].properties.heat_ee;
var con_d = e.features[0].properties.con_d;
var con_ee = e.features[0].properties.con_ee;
var light_ee = e.features[0].properties.light_ee;
var fuel = e.features[0].properties.fuel;
var building_type = e.features[0].properties.building_type;
var year = e.features[0].properties.year;


var description = '<div class="epcbox"><p><b>Address:</b> ' + addr + '</p>' +
'<p><b>EPC Score:</b> ' + cur_ee + ' (' +  cur_rate + ')</p>' +
'<p><b>Potential EPC Score:</b> ' + per_ee + '</p>' +
'<p><b>Building type:</b> ' + building_type + '</p>' +
'<p><b>Constructed:</b> ' + age + '</p>' +
'<p><b>Last assessed:</b> ' + year + '</p>' +
'<p><b>Floor area:</b> ' + area + 'm<sup>2</sup></p>' +
'<p><b>Main fuel:</b> ' + fuel + '</p>' +

'<p><b>Walls:</b> ' + wall_d + ' (' +  wall_ee + ')</p>' +
'<p><b>Roof:</b> ' + roof_d + ' (' +  roof_ee + ')</p>' +
'<p><b>Floors:</b> ' + floor_ee + '</p>' +
'<p><b>Windows:</b> ' + wind_d + ' (' +  wind_ee + ')</p>' +
'<p><b>Heating:</b> ' + heat_d + ' (' +  heat_ee + ')</p>' +
'<p><b>Heating Controls:</b> ' + con_d + ' (' +  con_ee + ')</p>' +
'<p><b>Hot water:</b> ' + water_d + ' (' +  water_ee + ')</p>' +
'<p><b>Lighting:</b> ' + light_ee + '</p></div>';
 

new maplibregl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});
 
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'postcode', function () {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'postcode', function () {
map.getCanvas().style.cursor = '';
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'epc', function () {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'epc', function () {
map.getCanvas().style.cursor = '';
});
 
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'transitstops', function () {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'transitstops', function () {
map.getCanvas().style.cursor = '';
});

// Show Isochrones
map.on('click', 'centroids', function (e) {
  var lsoacode = e.features[0].properties.code;
  var lsoaurl = 'https://www.carbon.place/data/isochrones/' + lsoacode + '.geojson';
  
  if (map.getLayer('isochrones')){
    console.log("removed layer");
    map.removeLayer('isochrones');
    
  }
  
  if(map.getSource('isochrones')){
    console.log("removed source");
    map.removeSource('isochrones');
  }
  
  map.addSource('isochrones', {
    type: 'geojson',
    data: lsoaurl
  });
  console.log("add source");
  
  map.on('sourcedata', function(e) {
  if (e.isSourceLoaded) {
  // Do something when the source has finished loading
  if (map.getLayer('isochrones')){
    //console.log("removed layer");
    map.removeLayer('isochrones');
   
  } 
  map.addLayer(
          {
          'id': 'isochrones',
          'type': 'fill',
          'source': 'isochrones',
          "paint": {
                  "fill-color": [
          			'match',
          			['get', 'mode'],
          			'WALK','#4daf4a',
          			'BIKE','#377eb8',
          			'TRANSIT','#984ea3',
          			'BIKETRANSIT','#e41a1c',
          			/* other */ '#e0e0e0'
          			],
                  "fill-opacity": 0.9,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.9)'
                }
          },  'roads 0 Restricted Road' /*'landcover_grass'*/
          );
  }
  });

});

