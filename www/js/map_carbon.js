// Setup Map
mapboxgl.accessToken = "NotNeeded";
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'tiles/style.json', // stylesheet location
center: [-1.548, 53.795], // starting position [lng, lat]
zoom: 10 // starting zoom
});


// Declare Chart Values
var elecChart;
var gasChart;
var t2wChart;
 
map.on('load', function() {
map.addSource('carbon', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/carbon/tiles/carbon/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

});


function switchLayer(layer) {
  var layerId = document.getElementById("layerinput").value;
  var layers = map.getStyle().layers;
  
  if (map.getLayer('carbon')) map.removeLayer('carbon');
  
  switchLayerDesc();
  
  document.getElementById("legend").innerHTML = `<h4>Grades</h4>
      <div><span style="background-color: #313695"></span>A+ (best 1%)</div>
  		<div><span style="background-color: #4575b4"></span>A</div>
  		<div><span style="background-color: #4575b4"></span>A- (best 10%)</div>
  		<div><span style="background-color: #74add1"></span>B+</div>
  		<div><span style="background-color: #abd9e9"></span>B</div>
  		<div><span style="background-color: #abd9e9"></span>B-</div>
  		<div><span style="background-color: #e0f3f8"></span>C+</div>
  		<div><span style="background-color: #e0f3f8"></span>C</div>
  		<div><span style="background-color: #ffffbf"></span>C- (just above average)</div>
  		<div><span style="background-color: #ffffbf"></span>D+ (just below average)</div>
  		<div><span style="background-color: #fee090"></span>D</div>
  		<div><span style="background-color: #fee090"></span>D-</div>
  		<div><span style="background-color: #fdae61"></span>E+</div>
  		<div><span style="background-color: #fdae61"></span>E</div>
  		<div><span style="background-color: #f46d43"></span>E-</div>
  		<div><span style="background-color: #d73027"></span>F+ (worst 10%)</div>
  		<div><span style="background-color: #d73027"></span>F</div>
  		<div><span style="background-color: #a50026"></span>F- (worst 1%)</div>
  		<div><span style="background-color: #e0e0e0"></span>No Data</div>`;
      
      
  
  map.addLayer(
  {
  'id': 'carbon',
  'type': 'fill',
  'source': 'carbon',
  'source-layer': 'carbon',
  "paint": {
          "fill-color": [
  			'match',
  			['get', layerId],
  			'A+','#313695',
  			'A','#4575b4',
  			'A-','#4575b4',
  			'B+','#74add1',
  			'B','#abd9e9',
  			'B-','#abd9e9',
  			'C+','#e0f3f8',
  			'C','#e0f3f8',
  			'C-','#ffffbf',
  			'D+','#ffffbf',
  			'D','#fee090',
  			'D-','#fee090',
  			'E+','#fdae61',
  			'E','#fdae61',
  			'E-','#f46d43',
  			'F+','#d73027',
  			'F','#d73027',
  			'F-','#a50026',
  			/* other */ '#e0e0e0'
  			],
          "fill-opacity": 0.7,
          'fill-outline-color': 'rgba(0, 0, 0, 0.5)'
        }
  }, 'housenumber'
  );
  

}

// On click open modal
map.on('click', 'carbon', function(e) {

	modal.style.display = "block";
	
	var elecHistory = [
		e.features[0].properties.MeanDomElec_10_kWh,
		e.features[0].properties.MeanDomElec_11_kWh,
		e.features[0].properties.MeanDomElec_12_kWh,
		e.features[0].properties.MeanDomElec_13_kWh,
		e.features[0].properties.MeanDomElec_14_kWh,
		e.features[0].properties.MeanDomElec_15_kWh,
		e.features[0].properties.MeanDomElec_16_kWh,
		e.features[0].properties.MeanDomElec_17_kWh
    ];
	
	var gasHistory = [
		e.features[0].properties.MeanDomGas_10_kWh,
		e.features[0].properties.MeanDomGas_11_kWh,
		e.features[0].properties.MeanDomGas_12_kWh,
		e.features[0].properties.MeanDomGas_13_kWh,
		e.features[0].properties.MeanDomGas_14_kWh,
		e.features[0].properties.MeanDomGas_15_kWh,
		e.features[0].properties.MeanDomGas_16_kWh,
		e.features[0].properties.MeanDomGas_17_kWh
    ];
	
	var t2wshare = [
		e.features[0].properties.T2W_Bus,
		e.features[0].properties.T2W_Car,
		e.features[0].properties.T2W_Cycle,
		e.features[0].properties.T2W_Foot,
		e.features[0].properties.T2W_Home,
		e.features[0].properties.T2W_Mbike,
		e.features[0].properties.T2W_Metro,
		e.features[0].properties.T2W_Other,
		e.features[0].properties.T2W_Passenger,
		e.features[0].properties.T2W_Taxi,
		e.features[0].properties.T2W_Train
    ];
	 
	document.getElementById("data_total_emissions_percap").innerHTML = e.features[0].properties.total_emissions_percap;
	document.getElementById("data_elec_emissions_household").innerHTML = e.features[0].properties.elec_emissions_household;
	document.getElementById("data_gas_emissions_household").innerHTML = e.features[0].properties.gas_emissions_household;
	
	document.getElementById("data_total_emissions_grade").src = "/images/grades/" + e.features[0].properties.total_emissions_grade + ".jpg";
	document.getElementById("data_elec_emissions_grade").src  = "/images/grades/" + e.features[0].properties.elec_emissions_grade + ".jpg";
	document.getElementById("data_gas_emissions_grade").src   = "/images/grades/" + e.features[0].properties.gas_emissions_grade + ".jpg";
	
	// Define Charts
	// Electric Chart
	
	if(elecChart){
		elecChart.destroy();
	}
		
	var elecctx = document.getElementById('elecChart').getContext('2d');
	elecChart = new Chart(elecctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017'],
			datasets: [{
				label: 'Mean Electicity use per household (kWh)',
				data: elecHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false
		}
	});

	// Travel to Work Modeshare
	if(t2wChart){
		t2wChart.destroy();
	}
	
	var t2wctx = document.getElementById('t2wChart').getContext('2d');
	t2wChart = new Chart(t2wctx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Main mode of travel to work',
				data: t2wshare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(251,154,153, 1)',
				'rgba(227,26,28, 1)',
				'rgba(253,191,111, 1)',
				'rgba(255,127,0, 1)',
				'rgba(202,178,214, 1)',
				'rgba(106,61,154, 1)',
				'rgba(255,255,153, 1)'
				]
				
			}],
			
			labels: ['Bus','Car Driver','Cycle','Walk','Work from home',
			'Motorbike','Metro','Other','Car passenger',
			'Taxi','Train']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});

	// Gas Consumption
	
	if(gasChart){
		gasChart.destroy();
	}
	
	var gasctx = document.getElementById('gasChart').getContext('2d');
	gasChart = new Chart(gasctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017'],
			datasets: [{
				label: 'Mean Gas use per household (kWh)',
				data: gasHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false
		}
	});
	
});






