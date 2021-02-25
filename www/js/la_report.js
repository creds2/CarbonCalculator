
// Declare Chart Values
var elecChart;
var gasChart;
var overallChart;
var buildingageChart;
var buildingtypeChart;
var carpercapChart;
var heatingChart;


function switchLALayer() {
  var layerId = document.getElementById("lainput").value;
  
	var la = ladata.find(obj => {
    return obj.LAD17NM === layerId;
  });
	
	var england = ladata.find(obj => {
    return obj.LAD17NM === "England";
  });
  
	
	
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
    la.gas_percap_2017, england.gas_percap_2017
  ];
  
  var overallelec = [
    la.elec_percap_2017, england.elec_percap_2017
  ];
  
  var overallcar = [
    la.car_percap_2018, england.car_percap_2018
  ];
  
  var overallvan = [
    la.van_percap_2018, england.van_percap_2018
  ];
  
  var overallflights = [
    la.flights_percap_2018, england.flights_percap_2018
  ];
  
  var overallotherheat = [
    la.other_heat_percap_2011, england.other_heat_percap_2011
  ];
  
  var overallnutrition = [
    la.nutrition_kgco2e_percap, england.nutrition_kgco2e_percap
  ];
  var overallothershelter = [
    la.other_shelter_kgco2e_percap, england.other_shelter_kgco2e_percap
  ];
  var overallconsumables = [
    la.consumables_kgco2e_percap, england.consumables_kgco2e_percap
  ];
  var overallrecreation = [
    la.recreation_kgco2e_percap, england.recreation_kgco2e_percap
  ];
  var overallservices = [
    la.services_kgco2e_percap, england.services_kgco2e_percap
  ];
  var overallcommutenoncar = [
    la.commute_noncar_percap, england.commute_noncar_percap
  ];
  
  
  var buildingageshare = [
		la.pP1900,
    la.p1900_18,
    la.p1919_29,
    la.p1930_39,
    la.p1945_54,             
    la.p1955_64,
    la.p1965_72,
    la.p1973_82,
    la.p1983_92,
    la.p1993_99,
    la.p2000_09,
    la.p2010_15,
    la.pUNKNOWN
    ];
    
  var buildingtypeshare = [
		la.Whole_House_Detached,
    la.Whole_House_Semi,
    la.Whole_House_Terraced,
    la.Flat_PurposeBuilt,
    la.Flat_Converted,             
    la.Flat_Commercial,
    la.Caravan
    ];
    
  var heatingShare = [
		la.pHeating_Gas,
    la.pHeating_Electric,
    la.pHeating_Oil,
    la.pHeating_Solid,
    la.pHeating_Other,             
    la.pHeating_None
    ];
	
	document.getElementById("data_total_emissions_percap").innerHTML = la.total_percap;
	document.getElementById("data_elec_emissions_household").innerHTML = la.elec_percap_2017;
	document.getElementById("data_gas_emissions_household").innerHTML = la.gas_percap_2017;
	document.getElementById("data_other_heating_emissions").innerHTML = la.other_heat_percap_2011;
	document.getElementById("data_car_emissions").innerHTML = la.car_percap_2018;
	document.getElementById("data_van_emissions").innerHTML = la.van_percap_2018;
	document.getElementById("data_flights_emissions").innerHTML = la.flights_percap_2018;
	
	document.getElementById("data_total_emissions_grade").src = "images/grades/" + la.total_emissions_grade + ".jpg";
	document.getElementById("data_elec_emissions_grade").src  = "images/grades/" + la.elec_emissions_grade + ".jpg";
	document.getElementById("data_gas_emissions_grade").src   = "images/grades/" + la.gas_emissions_grade + ".jpg";
	document.getElementById("data_other_heating_emissions_grade").src   = "images/grades/" + la.other_heating_emissions_grade + ".jpg";
	document.getElementById("data_car_emissions_grade").src   = "images/grades/" + la.car_emissions_grade + ".jpg";
	document.getElementById("data_van_emissions_grade").src   = "images/grades/" + la.van_emissions_grade + ".jpg";
	document.getElementById("data_flights_emissions_grade").src   = "images/grades/" + la.flights_grade + ".jpg";
	
	// Define Charts
	// EPC Score Chart
	makeChartsEPC(la);
	
	// Transport Charts
	makeChartsTransport(la, la, england);
	
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
			datasets: [
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
			labels: ['Local Authority Average','England Average'],
			datasets: [{
				label: 'Gas',
				data: overallgas,
				backgroundColor: 'rgba(166,206,227, 0.8)',
				borderColor: 'rgba(166,206,227, 1)',
				borderWidth: 1
			},
			{
				label: 'Electricity',
				data: overallelec,
				backgroundColor: 'rgba(31,120,180, 0.8)',
				borderColor: 'rgba(31,120,180, 1)',
				borderWidth: 1
			},
			{
				label: 'Other Heating',
				data: overallotherheat,
				backgroundColor: 'rgba(178,223,138, 0.8)',
				borderColor: 'rgba(178,223,138, 1)',
				borderWidth: 1
			},
			{
				label: 'Other Housing',
				data: overallothershelter ,
				backgroundColor: 'rgba(51,160,44, 0.8)',
				borderColor: 'rgba(51,160,44, 1)',
				borderWidth: 1
			},
			{
				label: 'Cars',
				data: overallcar,
				backgroundColor: 'rgba(251,154,153, 0.8)',
				borderColor: 'rgba(251,154,153, 1)',
				borderWidth: 1
			},
			{
				label: 'Vans',
				data: overallvan,
				backgroundColor: 'rgba(227,26,28, 0.8)',
				borderColor: 'rgba(227,26,28, 1)',
				borderWidth: 1
			},
			{
				label: 'Public Transport',
				data: overallcommutenoncar,
				backgroundColor: 'rgba(253,191,111, 0.8)',
				borderColor: 'rgba(253,191,111, 1)',
				borderWidth: 1
			},
			{
				label: 'Flights',
				data: overallflights,
				backgroundColor: 'rgba(255,127,0, 0.8)',
				borderColor: 'rgba(255,127,0, 1)',
				borderWidth: 1
			},
			{
				label: 'Food & Drink',
				data: overallnutrition,
				backgroundColor: 'rgba(202,178,214, 0.8)',
				borderColor: 'rgba(202,178,214, 1)',
				borderWidth: 1
			},
			{
				label: 'Consumable Goods',
				data: overallconsumables ,
				backgroundColor: 'rgba(106,61,154, 0.8)',
				borderColor: 'rgba(106,61,154, 1)',
				borderWidth: 1
			},
			{
				label: 'Recreation',
				data: overallrecreation,
				backgroundColor: 'rgba(255,255,153, 0.8)',
				borderColor: 'rgba(255,255,153, 1)',
				borderWidth: 1
			},
			{
				label: 'Services',
				data: overallservices,
				backgroundColor: 'rgba(177,89,40, 0.8)',
				borderColor: 'rgba(177,89,40, 1)',
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
	
}


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