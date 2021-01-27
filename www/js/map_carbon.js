// Setup Map
mapboxgl.accessToken = "NotNeeded";
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'tiles/style_ontop.json', // stylesheet location
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

map.addSource('la', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/carbon/tiles/la/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

toggleLayer('carbon');
toggleLayer('la');

});




// On click open modal
map.on('click', 'carbon', function(e) {

	modal.style.display = "block";
	
	var sub = e.features[0].properties;
	//console.log(sub.LAD17NM);
	//console.log(ladata);
	var la = ladata.find(obj => {
    return obj.LAD17NM === sub.LAD17NM;
  });
	//console.log(la);
	
	var england = ladata.find(obj => {
    return obj.LAD17NM === "England";
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
		sub.gas_percap_2017,
		sub.elec_percap_2017,
		sub.car_percap_2018,
		sub.van_percap_2018,
		0,
		sub.flights_percap_2018,
		sub.other_heat_percap_2011,
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
				label: 'Mean CO2 emission from electricity use (kgCO2e / per person)',
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
				label: 'This LSOA',
				data: gasHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authoirty Average',
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



