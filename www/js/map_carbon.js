// Setup Map
mapboxgl.accessToken = "NotNeeded";
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'tiles/style_ontop.json' , // stylesheet location 'tiles/oszoomstack/OS Open Zoomstack - Night.json'
center: [-0.151, 51.482], // starting position [lng, lat]
zoom: 7 // starting zoom
});


// Declare Chart Values
var elecChart;
var gasChart;
var overallChart;
var buildingageChart;
var buildingtypeChart;
var carpercapChart;
var heatingChart;

// Highlight variable
//var hoveredStateId = null;

 
map.on('load', function() {
map.addSource('carbon', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/carbon/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('la', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/la/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('busstops', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/busstops/{z}/{x}/{y}.pbf'
	],
	'minzoom': 8,
	'maxzoom': 13
});

map.addSource('centroids', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/centroids/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 13
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

toggleLayer('carbon');
toggleLayer('la');
toggleLayer('busstops');
toggleLayer('centroids');

// Highlight LSOA on mouse over
    
//map.on('mousemove', 'carbon', function (e) {
//  if (e.features.length > 0) {
//  if (hoveredStateId) {
//  map.setFeatureState(
//  { source: 'carbon', id: hoveredStateId },
//  { hover: false }
//  );
//  }
//  hoveredStateId = e.features[0].id;
//  console.log(hoveredStateId);
//  map.setFeatureState(
//  { source: 'carbon', id: hoveredStateId },
//  { hover: true }
//  );
//  }
//});


//map.on('mouseleave', 'carbon', function () {
//  if (hoveredStateId) {
//  map.setFeatureState(
//  { source: 'carbon', id: hoveredStateId },
//  { hover: false }
//  );
//  }
//  hoveredStateId = null;
//});

});

// Show Isochrones
map.on('click', 'centroids', function (e) {
  var lsoacode = e.features[0].properties.code;
  var lsoaurl = 'https://www.carbon.place/carbon/data/isochrones/' + lsoacode + '.geojson';
  
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
    console.log("removed layer");
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
          },  'housenumber' /*'landcover_grass'*/
          );
  }
  });

});


/*
function sourceCallback() {
    // assuming 'map' is defined globally, or you can use 'this'
    if (map.getSource('isochrones') && map.isSourceLoaded('isochrones')) {
        console.log('source loaded!');
        map.addLayer(
          {
          'id': 'isochrones',
          'type': 'fill',
          'source': 'isochrones',
          'source-layer': 'isochrones',
          "paint": {
                  "fill-color": [
          			'match',
          			['get', 'mode'],
          			'WALK','#313695',
          			'BIKE','#4575b4',
          			'TRANSIT','#4575b4'
          			],
                  "fill-opacity": 0.7,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.5)'
                }
          },  'housenumber'
          );
    }
}
*/

//map.once('sourcedata', sourceCallback);


// On click open modal
map.on('click', 'carbon', function(e) {

	modal.style.display = "block";
	
	var sub = e.features[0].properties;
	var la = ladata.find(obj => {
    return obj.LAD17NM === sub.LAD17NM;
  });
	
	var england = ladata.find(obj => {
    return obj.LAD17NM === "England";
  });
  
  var oac = oacdata.find(obj => {
    return obj.SOAC11NM === sub.SOAC11NM;
  });
	

	
	var gasHistory = [
		sub.gas_percap_2010,
		sub.gas_percap_2011,
		sub.gas_percap_2012,
		sub.gas_percap_2013,
		sub.gas_percap_2014,
		sub.gas_percap_2015,
		sub.gas_percap_2016,
		sub.gas_percap_2017
    ];
    
  var lagasHistory = [
		la.gas_percap_2010,
		la.gas_percap_2011,
		la.gas_percap_2012,
		la.gas_percap_2013,
		la.gas_percap_2014,
		la.gas_percap_2015,
		la.gas_percap_2016,
		la.gas_percap_2017
    ];
    
  var englandgasHistory = [
		england.gas_percap_2010,
		england.gas_percap_2011,
		england.gas_percap_2012,
		england.gas_percap_2013,
		england.gas_percap_2014,
		england.gas_percap_2015,
		england.gas_percap_2016,
		england.gas_percap_2017
    ];
	
	var elecHistory = [
		sub.elec_percap_2010,
		sub.elec_percap_2011,
		sub.elec_percap_2012,
		sub.elec_percap_2013,
		sub.elec_percap_2014,
		sub.elec_percap_2015,
		sub.elec_percap_2016,
		sub.elec_percap_2017
    ];
    
  var laelecHistory = [
		la.elec_percap_2010,
		la.elec_percap_2011,
		la.elec_percap_2012,
		la.elec_percap_2013,
		la.elec_percap_2014,
		la.elec_percap_2015,
		la.elec_percap_2016,
		la.elec_percap_2017
    ];
    
  var englandelecHistory = [
		england.elec_percap_2010,
		england.elec_percap_2011,
		england.elec_percap_2012,
		england.elec_percap_2013,
		england.elec_percap_2014,
		england.elec_percap_2015,
		england.elec_percap_2016,
		england.elec_percap_2017
    ];
	

  var overallgas = [
    sub.gas_percap_2017, la.gas_percap_2017, england.gas_percap_2017, oac.gas_percap_2017
  ];
  
  var overallelec = [
    sub.elec_percap_2017, la.elec_percap_2017, england.elec_percap_2017, oac.elec_percap_2017
  ];
  
  var overallcar = [
    sub.car_percap_2018, la.car_percap_2018, england.car_percap_2018, oac.car_percap_2018
  ];
  
  var overallvan = [
    sub.van_percap_2018, la.van_percap_2018, england.van_percap_2018, oac.van_percap_2018
  ];
  
  var overallflights = [
    sub.flights_percap_2018, la.flights_percap_2018, england.flights_percap_2018, oac.flights_percap_2018
  ];
  
  var overallotherheat = [
    sub.other_heat_percap_2011, la.other_heat_percap_2011, england.other_heat_percap_2011, oac.other_heat_percap_2011
  ];
  
  var overallnutrition = [
    sub.nutrition_kgco2e_percap, la.nutrition_kgco2e_percap, england.nutrition_kgco2e_percap, oac.nutrition_kgco2e_percap
  ];
  var overallothershelter = [
    sub.other_shelter_kgco2e_percap, la.other_shelter_kgco2e_percap, england.other_shelter_kgco2e_percap, oac.other_shelter_kgco2e_percap
  ];
  var overallconsumables = [
    sub.consumables_kgco2e_percap, la.consumables_kgco2e_percap, england.consumables_kgco2e_percap,oac.consumables_kgco2e_percap
  ];
  var overallrecreation = [
    sub.recreation_kgco2e_percap, la.recreation_kgco2e_percap, england.recreation_kgco2e_percap, oac.recreation_kgco2e_percap
  ];
  var overallservices = [
    sub.services_kgco2e_percap, la.services_kgco2e_percap, england.services_kgco2e_percap, oac.services_kgco2e_percap
  ];
  var overallcommutenoncar = [
    sub.commute_noncar_percap, la.commute_noncar_percap, england.commute_noncar_percap, oac.commute_noncar_percap
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
    
  var heatingShare = [
		sub.pHeating_Gas,
    sub.pHeating_Electric,
    sub.pHeating_Oil,
    sub.pHeating_Solid,
    sub.pHeating_Other,             
    sub.pHeating_None
    ];
	
	document.getElementById("modal-title").innerHTML = "<h2>" + sub.LSOA11 + " a '" +
	sub.SOAC11NM + "' LSOA in " +  sub.LAD17NM +"</h2>";
	
	document.getElementById("data_total_emissions_percap").innerHTML = sub.total_percap;
	document.getElementById("data_elec_emissions_household").innerHTML = sub.elec_percap_2017;
	document.getElementById("data_gas_emissions_household").innerHTML = sub.gas_percap_2017;
	document.getElementById("data_other_heating_emissions").innerHTML = sub.other_heat_percap_2011;
	document.getElementById("data_car_emissions").innerHTML = sub.car_percap_2018;
	document.getElementById("data_van_emissions").innerHTML = sub.van_percap_2018;
	document.getElementById("data_flights_emissions").innerHTML = sub.flights_percap_2018;
	
	document.getElementById("data_LSOA11").innerHTML = sub.LSOA11;
	document.getElementById("data_LSOA11NM").innerHTML = sub.LSOA11NM;
	document.getElementById("data_SOAC11NM").innerHTML = sub.SOAC11NM;
	document.getElementById("data_LAD17CD").innerHTML = sub.LAD17CD;
	document.getElementById("data_LAD17NM").innerHTML = sub.LAD17NM;
	
	document.getElementById("data_total_emissions_grade").src = "images/grades/" + sub.total_emissions_grade + ".jpg";
	document.getElementById("data_elec_emissions_grade").src  = "images/grades/" + sub.elec_emissions_grade + ".jpg";
	document.getElementById("data_gas_emissions_grade").src   = "images/grades/" + sub.gas_emissions_grade + ".jpg";
	document.getElementById("data_other_heating_emissions_grade").src   = "images/grades/" + sub.other_heating_emissions_grade + ".jpg";
	document.getElementById("data_car_emissions_grade").src   = "images/grades/" + sub.car_emissions_grade + ".jpg";
	document.getElementById("data_van_emissions_grade").src   = "images/grades/" + sub.van_emissions_grade + ".jpg";
	document.getElementById("data_flights_emissions_grade").src   = "images/grades/" + sub.flights_grade + ".jpg";
	
	// Define Charts
	// EPC Score Chart
	makeChartsEPC(sub);
	
	// Transport Charts
	makeChartsTransport(sub, la, england);
	
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
				label: 'This LSOA',
				data: elecHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: laelecHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.8)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandelecHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.8)',
				borderColor: 'rgba(99, 255, 13, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
				  scaleLabel: {
            display: true,
            labelString: 'kg CO\u2082e per person'
          },
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: true,
			maintainAspectRatio: false
		}
	});
	
	
	// Heating Share
	if(heatingChart){
		heatingChart.destroy();
	}
	
	var heatingctx = document.getElementById('heatingChart').getContext('2d');
	heatingChart = new Chart(heatingctx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Main mode of travel to work',
				data: heatingShare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				'rgba(251,154,153, 1)',
				'rgba(227,26,28, 1)'
				]
				
			}],
			
			labels: ['Gas','Electricity','Oil','Soild Fuel','Other','None']
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
				label: 'This LSOA',
				data: gasHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lagasHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandgasHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.8)',
				borderColor: 'rgba(99, 255, 132, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
				  scaleLabel: {
            display: true,
            labelString: 'kg CO\u2082e per person'
          },
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
	overallChart = new Chart(overallctx, {
		type: 'bar',
		data: {
			labels: ['This LSOA','Local Authority Average','England Average','Similar LSOAs'],
			datasets: [{
				label: 'Gas',
				data: overallgas,
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1,
				order: 2
			},
			{
				label: 'Electricity',
				data: overallelec,
				backgroundColor: 'rgba(31,120,180, 0.8)',
				borderColor: 'rgba(31,120,180, 1)',
				borderWidth: 1,
				order: 3
			},
			{
				label: 'Other Heating',
				data: overallotherheat,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1,
				order: 4
			},
			{
				label: 'Other Housing',
				data: overallothershelter ,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1,
				order: 5
			},
			{
				label: 'Cars',
				data: overallcar,
				backgroundColor: 'rgba(251,154,153, 0.8)',
				borderColor: 'rgba(251,154,153, 1)',
				borderWidth: 1,
				order: 6
			},
			{
				label: 'Vans',
				data: overallvan,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1,
				order: 7
			},
			{
				label: 'Public Transport',
				data: overallcommutenoncar,
				backgroundColor: 'rgba(253,191,111, 0.8)',
				borderColor: 'rgba(253,191,111, 1)',
				borderWidth: 1,
				order: 8
			},
			{
				label: 'Flights',
				data: overallflights,
				backgroundColor: 'rgba(255,127,0, 0.8)',
				borderColor: 'rgba(255,127,0, 1)',
				borderWidth: 1,
				order: 9
			},
			{
				label: 'Food & Drink',
				data: overallnutrition,
				backgroundColor: 'rgba(202,178,214, 0.8)',
				borderColor: 'rgba(202,178,214, 1)',
				borderWidth: 1,
				order: 10
			},
			{
				label: 'Consumable Goods',
				data: overallconsumables ,
				backgroundColor: 'rgba(106,61,154, 0.8)',
				borderColor: 'rgba(106,61,154, 1)',
				borderWidth: 1,
				order: 11
			},
			{
				label: 'Recreation',
				data: overallrecreation,
				backgroundColor: 'rgba(255,255,153, 0.8)',
				borderColor: 'rgba(255,255,153, 1)',
				borderWidth: 1,
				order: 12
			},
			{
				label: 'Services',
				data: overallservices,
				backgroundColor: 'rgba(177,89,40, 0.8)',
				borderColor: 'rgba(177,89,40, 1)',
				borderWidth: 1,
				order: 13
			},
			{
				label: '2032 Target',
				data: [2849, 2849, 2849, 2849],
				type: 'line',
				order: 1,
				borderColor : 'rgba(0,0,0, 0.8)'
			},
			
			]
		},
		options: {
			scales: {
				yAxes: [{
				  stacked: true,
				  scaleLabel: {
            display: true,
            labelString: 'kg CO\u2082e per person'
          },
					ticks: {
						beginAtZero: true,
						
					}
				}],
				xAxes: [{
				  stacked: true
				}],
			},
			responsive: true,
			maintainAspectRatio: false
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
			
			labels: ['Detached house',
                'Semi-detached house',
                'Terraced house',
                'Purpose built flat',
                'Converted flat',             
                'Flat above commercial property',
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


// Modal Tabs
document.getElementById("defaultOpen").click();

function openCity(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
} 
