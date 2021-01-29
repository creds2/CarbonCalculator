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
var carChart;
var vanChart;
var t2wChart;
var t2sChart;
var overallChart;
var buildingageChart;
var buildingtypeChart;
var carpercapChart;
var co2perkmChart;
var heatingChart;
 
map.on('load', function() {
map.addSource('carbon', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/carbon/tiles/carbon/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('la', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/carbon/tiles/la/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('busstops', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/carbon/tiles/busstops/{z}/{x}/{y}.pbf'
	],
	'minzoom': 8,
	'maxzoom': 13
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

toggleLayer('carbon');
toggleLayer('la');
toggleLayer('busstops');

});




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
	
	var carHistory = [
		sub.car_percap_2010,
		sub.car_percap_2011,
		sub.car_percap_2012,
		sub.car_percap_2013,
		sub.car_percap_2014,
		sub.car_percap_2015,
		sub.car_percap_2016,
		sub.car_percap_2017,
		sub.car_percap_2018
    ];
	
	var lacarHistory = [
		la.car_percap_2010,
		la.car_percap_2011,
		la.car_percap_2012,
		la.car_percap_2013,
		la.car_percap_2014,
		la.car_percap_2015,
		la.car_percap_2016,
		la.car_percap_2017,
		la.car_percap_2018
    ];
    
  var englandcarHistory = [
		england.car_percap_2010,
		england.car_percap_2011,
		england.car_percap_2012,
		england.car_percap_2013,
		england.car_percap_2014,
		england.car_percap_2015,
		england.car_percap_2016,
		england.car_percap_2017,
		england.car_percap_2018
    ];
    
  var vanHistory = [
		sub.van_percap_2010,
		sub.van_percap_2011,
		sub.van_percap_2012,
		sub.van_percap_2013,
		sub.van_percap_2014,
		sub.van_percap_2015,
		sub.van_percap_2016,
		sub.van_percap_2017,
		sub.van_percap_2018
    ];
	
	var lavanHistory = [
		la.van_percap_2010,
		la.van_percap_2011,
		la.van_percap_2012,
		la.van_percap_2013,
		la.van_percap_2014,
		la.van_percap_2015,
		la.van_percap_2016,
		la.van_percap_2017,
		la.van_percap_2018
    ];
    
  var englandvanHistory = [
		england.van_percap_2010,
		england.van_percap_2011,
		england.van_percap_2012,
		england.van_percap_2013,
		england.van_percap_2014,
		england.van_percap_2015,
		england.van_percap_2016,
		england.van_percap_2017,
		england.van_percap_2018
    ];
	
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
    
  var overallgas = [
    sub.gas_percap_2017, la.gas_percap_2017, england.gas_percap_2017,
  ];
  
  var overallelec = [
    sub.elec_percap_2017, la.elec_percap_2017, england.elec_percap_2017,
  ];
  
  var overallcar = [
    sub.car_percap_2018, la.car_percap_2018, england.car_percap_2018,
  ];
  
  var overallvan = [
    sub.van_percap_2018, la.van_percap_2018, england.van_percap_2018,
  ];
  
  var overallflights = [
    sub.flights_percap_2018, la.flights_percap_2018, england.flights_percap_2018,
  ];
  
  var overallotherheat = [
    sub.other_heat_percap_2011, la.other_heat_percap_2011, england.other_heat_percap_2011,
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
    
    
  var carpercapHistory = [
		sub.cars_percap_2010,
    sub.cars_percap_2011,
    sub.cars_percap_2012,
    sub.cars_percap_2013,
    sub.cars_percap_2014,             
    sub.cars_percap_2015,
    sub.cars_percap_2016,
    sub.cars_percap_2017,
    sub.cars_percap_2018
    ];
    
  var lacarpercapHistory = [
		la.cars_percap_2010,
    la.cars_percap_2011,
    la.cars_percap_2012,
    la.cars_percap_2013,
    la.cars_percap_2014,             
    la.cars_percap_2015,
    la.cars_percap_2016,
    la.cars_percap_2017,
    la.cars_percap_2018
    ];
  
  var englandcarpercapHistory = [
		england.cars_percap_2010,
    england.cars_percap_2011,
    england.cars_percap_2012,
    england.cars_percap_2013,
    england.cars_percap_2014,             
    england.cars_percap_2015,
    england.cars_percap_2016,
    england.cars_percap_2017,
    england.cars_percap_2018
    ];  
    
	var co2perkmHistory = [
		sub.AvgCO2_cars_2010,
    sub.AvgCO2_cars_2011,
    sub.AvgCO2_cars_2012,
    sub.AvgCO2_cars_2013,
    sub.AvgCO2_cars_2014,             
    sub.AvgCO2_cars_2015,
    sub.AvgCO2_cars_2016,
    sub.AvgCO2_cars_2017,
    sub.AvgCO2_cars_2018
    ];
	
	var laco2perkmHistory = [
		la.AvgCO2_cars_2010,
    la.AvgCO2_cars_2011,
    la.AvgCO2_cars_2012,
    la.AvgCO2_cars_2013,
    la.AvgCO2_cars_2014,             
    la.AvgCO2_cars_2015,
    la.AvgCO2_cars_2016,
    la.AvgCO2_cars_2017,
    la.AvgCO2_cars_2018
    ];
    
  var englandco2perkmHistory = [
		england.AvgCO2_cars_2010,
    england.AvgCO2_cars_2011,
    england.AvgCO2_cars_2012,
    england.AvgCO2_cars_2013,
    england.AvgCO2_cars_2014,             
    england.AvgCO2_cars_2015,
    england.AvgCO2_cars_2016,
    england.AvgCO2_cars_2017,
    england.AvgCO2_cars_2018
    ];
    
  var heatingShare = [
		sub.pHeating_Gas,
    sub.pHeating_Electric,
    sub.pHeating_Oil,
    sub.pHeating_Solid,
    sub.pHeating_Other,             
    sub.pHeating_None
    ];
	
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
	
	
	// Cars Chart
	if(carChart){
		carChart.destroy();
	}
		
	var carctx = document.getElementById('carChart').getContext('2d');
	carChart = new Chart(carctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
			datasets: [{
				label: 'This LSOA',
				data: carHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lacarHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.2)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandcarHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.2)',
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
	
	// van Chart
	if(vanChart){
		vanChart.destroy();
	}
		
	var vanctx = document.getElementById('vanChart').getContext('2d');
	vanChart = new Chart(vanctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
			datasets: [{
				label: 'This LSOA',
				data: vanHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lavanHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.2)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandvanHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.2)',
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
	
	// CO2 per km Chart
	if(co2perkmChart){
		co2perkmChart.destroy();
	}
		
	var co2perkmctx = document.getElementById('co2perkmChart').getContext('2d');
	co2perkmChart = new Chart(co2perkmctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
			datasets: [{
				label: 'This LSOA',
				data: co2perkmHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: laco2perkmHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.2)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandco2perkmHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.2)',
				borderColor: 'rgba(99, 255, 13, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
				  scaleLabel: {
            display: true,
            labelString: 'g CO\u2082e per km'
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
	
	
	// Cars Per Capita Chart
	if(carpercapChart){
		carpercapChart.destroy();
	}
		
	var carpercapctx = document.getElementById('carpercapChart').getContext('2d');
	carpercapChart = new Chart(carpercapctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
			datasets: [{
				label: 'This LSOA',
				data: carpercapHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lacarpercapHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.2)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandcarpercapHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.2)',
				borderColor: 'rgba(99, 255, 13, 1)',
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
				  scaleLabel: {
            display: true,
            labelString: 'cars per person'
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
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: laelecHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.2)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandelecHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.2)',
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
				label: 'This LSOA',
				data: gasHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lagasHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandgasHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.2)',
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
			labels: ['This LSOA','Local Authority Average','England Average'],
			datasets: [{
				label: 'Gas',
				data: overallgas,
				backgroundColor: 'rgba(228,26,28, 0.2)',
				borderColor: 'rgba(228,26,28, 1)',
				borderWidth: 1
			},
			{
				label: 'Electricity',
				data: overallelec,
				backgroundColor: 'rgba(55,126,184, 0.2)',
				borderColor: 'rgba(55,126,184, 1)',
				borderWidth: 1
			},
			{
				label: 'Other Heating',
				data: overallotherheat,
				backgroundColor: 'rgba(77,175,74, 0.2)',
				borderColor: 'rgba(77,175,74, 1)',
				borderWidth: 1
			},
			{
				label: 'Cars',
				data: overallcar,
				backgroundColor: 'rgba(152,78,163, 0.2)',
				borderColor: 'rgba(152,78,163, 1)',
				borderWidth: 1
			},
			{
				label: 'Vans',
				data: overallvan,
				backgroundColor: 'rgba(255,127,0, 0.2)',
				borderColor: 'rgba(255,127,0, 1)',
				borderWidth: 1
			},
			{
				label: 'Flights',
				data: overallflights,
				backgroundColor: 'rgba(255,255,51, 0.2)',
				borderColor: 'rgba(255,255,51, 1)',
				borderWidth: 1
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



