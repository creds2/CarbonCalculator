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
var t2sChart;
var overallChart;
var buildingageChart;
var buildingtypeChart;
 
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
	
	var sub = e.features[0].properties;
	
	var elecHistory = [
		sub.MeanDomElec_10_kWh,
		sub.MeanDomElec_11_kWh,
		sub.MeanDomElec_12_kWh,
		sub.MeanDomElec_13_kWh,
		sub.MeanDomElec_14_kWh,
		sub.MeanDomElec_15_kWh,
		sub.MeanDomElec_16_kWh,
		sub.MeanDomElec_17_kWh
    ];
	
	var gasHistory = [
		sub.MeanDomGas_10_kWh,
		sub.MeanDomGas_11_kWh,
		sub.MeanDomGas_12_kWh,
		sub.MeanDomGas_13_kWh,
		sub.MeanDomGas_14_kWh,
		sub.MeanDomGas_15_kWh,
		sub.MeanDomGas_16_kWh,
		sub.MeanDomGas_17_kWh
    ];
	
	var t2wshare = [
		sub.T2W_Bus,
		sub.T2W_Car,
		sub.T2W_Cycle,
		sub.T2W_Foot,
		sub.T2W_Home,
		sub.T2W_Mbike,
		sub.T2W_Metro,
		sub.T2W_Other,
		sub.T2W_Passenger,
		sub.T2W_Taxi,
		sub.T2W_Train
    ];
    
  var t2sshare = [
		sub.T2S_bicycle,
		sub.T2S_foot,
		sub.T2S_car
    ];
    
  var overallshare = [
		sub.gas_emissions_household,
		sub.elec_emissions_household,
		sub.car_emissions_percap,
		0,
		0,
		0,
		0,
		0
    ];
    

  var buildingageshare = [
		sub.pP1900,
    sub.p1900_18,
    sub.p1919_29,
    sub.p1930_39,
    sub.p1945_54,             
    sub.p1955_64,
    sub.p1965_72,
    sub.p1973_82,
    sub.p1983_92,
    sub.p1993_99,
    sub.p2000_09,
    sub.p2010_15,
    sub.pUNKNOWN
    ];
    
  var buildingtypeshare = [
		sub.Whole_House_Detached,
    sub.Whole_House_Semi,
    sub.Whole_House_Terraced,
    sub.Flat_PurposeBuilt,
    sub.Flat_Converted,             
    sub.Flat_Commercial,
    sub.Caravan
    ];
	 
	document.getElementById("data_total_emissions_percap").innerHTML = sub.total_emissions_percap;
	document.getElementById("data_elec_emissions_household").innerHTML = sub.elec_emissions_household;
	document.getElementById("data_gas_emissions_household").innerHTML = sub.gas_emissions_household;
	
	document.getElementById("data_total_emissions_grade").src = "/images/grades/" + sub.total_emissions_grade + ".jpg";
	document.getElementById("data_elec_emissions_grade").src  = "/images/grades/" + sub.elec_emissions_grade + ".jpg";
	document.getElementById("data_gas_emissions_grade").src   = "/images/grades/" + sub.gas_emissions_grade + ".jpg";
	
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


  // Travel to School Modeshare
	if(t2sChart){
		t2sChart.destroy();
	}
	
	var t2sctx = document.getElementById('t2sChart').getContext('2d');
	t2sChart = new Chart(t2sctx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Main mode of travel to School',
				data: t2sshare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)'
				]
				
			}],
			
			labels: ['Cycle','Foot','Car']
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
	
	
	// Overall Chart
	
	if(overallChart){
		overallChart.destroy();
	}
	
	var overallctx = document.getElementById('overallChart').getContext('2d');
	//overallctx.height(100);
	overallChart = new Chart(overallctx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Total Carbon Footprint',
				data: overallshare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(251,154,153, 1)',
				'rgba(227,26,28, 1)',
				'rgba(253,191,111, 1)',
				'rgba(255,127,0, 1)'
				]
				
			}],
			
			labels: ['Gas','Electricity','Driving (cars)','Driving (vans)','Public Transport',
			'Flights','Other Heating','Food and Goods']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	
	// Building Age Chart
	
	if(buildingageChart){
		buildingageChart.destroy();
	}
	
	var buildingagectx = document.getElementById('buildingageChart').getContext('2d');
	buildingageChart = new Chart(buildingagectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Building Age',
				data: buildingageshare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(251,154,153, 1)',
				'rgba(227,26,28, 1)',
				'rgba(253,191,111, 1)',
				'rgba(255,127,0, 1)',
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(251,154,153, 1)'
				]
				
			}],
			
			labels: ['Before 1900',
              '1900 to 1918',
              '1919 to 1929',
              '1930 to 1939',
              '1945 to 1954',             
              '1955 to 1964',
              '1965 to 1972',
              '1973 to 1982',
              '1983 to 1992',
              '1993 to 1999',
              '2000 to 1909',
              '2010 to 2015',
              'Unknown']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	
	// Building Type Chart
	
	if(buildingtypeChart){
		buildingtypeChart.destroy();
	}
	
	var buildingtypectx = document.getElementById('buildingtypeChart').getContext('2d');
	buildingtypeChart = new Chart(buildingtypectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Building Type',
				data: buildingtypeshare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(251,154,153, 1)',
				'rgba(227,26,28, 1)',
				'rgba(253,191,111, 1)'
				]
				
			}],
			
			labels: ['Whole_House_Detached',
                'Whole_House_Semi',
                'Whole_House_Terraced',
                'Flat_PurposeBuilt',
                'Flat_Converted',             
                'Flat_Commercial',
                'Caravan']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
});






