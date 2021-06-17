// Declare Chart Values
var overallChart;

makeChartsOverview = function(lsoadata, la, england, oac){
  
  if(lsoadata === null){
    var overallgas = [
    la.gas_percap_2018, england.gas_percap_2018
    ];
    
    var overallelec = [
      la.elec_percap_2018, england.elec_percap_2018
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
  } else {
    var overallgas = [
    lsoadata.gas_percap_2018, la.gas_percap_2018, england.gas_percap_2018, oac.gas_percap_2018
    ];
    
    var overallelec = [
      lsoadata.elec_percap_2018, la.elec_percap_2018, england.elec_percap_2018, oac.elec_percap_2018
    ];
    
    var overallcar = [
      lsoadata.car_percap_2018, la.car_percap_2018, england.car_percap_2018, oac.car_percap_2018
    ];
    
    var overallvan = [
      lsoadata.van_percap_2018, la.van_percap_2018, england.van_percap_2018, oac.van_percap_2018
    ];
    
    var overallflights = [
      lsoadata.flights_percap_2018, la.flights_percap_2018, england.flights_percap_2018, oac.flights_percap_2018
    ];
    
    var overallotherheat = [
      lsoadata.other_heat_percap_2011, la.other_heat_percap_2011, england.other_heat_percap_2011, oac.other_heat_percap_2011
    ];
    
    var overallnutrition = [
      lsoadata.nutrition_kgco2e_percap, la.nutrition_kgco2e_percap, england.nutrition_kgco2e_percap, oac.nutrition_kgco2e_percap
    ];
    var overallothershelter = [
      lsoadata.other_shelter_kgco2e_percap, la.other_shelter_kgco2e_percap, england.other_shelter_kgco2e_percap, oac.other_shelter_kgco2e_percap
    ];
    var overallconsumables = [
      lsoadata.consumables_kgco2e_percap, la.consumables_kgco2e_percap, england.consumables_kgco2e_percap,oac.consumables_kgco2e_percap
    ];
    var overallrecreation = [
      lsoadata.recreation_kgco2e_percap, la.recreation_kgco2e_percap, england.recreation_kgco2e_percap, oac.recreation_kgco2e_percap
    ];
    var overallservices = [
      lsoadata.services_kgco2e_percap, la.services_kgco2e_percap, england.services_kgco2e_percap, oac.services_kgco2e_percap
    ];
    var overallcommutenoncar = [
      lsoadata.commute_noncar_percap, la.commute_noncar_percap, england.commute_noncar_percap, oac.commute_noncar_percap
    ];
  }
  
  if(lsoadata !== null){
    document.getElementById("modal-title").innerHTML = "<h2>" + lsoadata.LSOA11 + " a '" +
  	lsoadata.SOAC11NM + "' LSOA in " +  lsoadata.WD18NM +"</h2>";
  	
  	document.getElementById("data_total_emissions_percap").innerHTML = lsoadata.total_kgco2e_percap;
  	document.getElementById("data_elec_emissions_household").innerHTML = lsoadata.elec_percap_2018;
  	document.getElementById("data_gas_emissions_household").innerHTML = lsoadata.gas_percap_2018;
  	document.getElementById("data_other_heating_emissions").innerHTML = lsoadata.other_heat_percap_2011;
  	document.getElementById("data_car_emissions").innerHTML = lsoadata.car_percap_2018;
  	document.getElementById("data_van_emissions").innerHTML = lsoadata.van_percap_2018;
  	document.getElementById("data_flights_emissions").innerHTML = lsoadata.flights_percap_2018;
  	document.getElementById("data_consumption_emissions").innerHTML = lsoadata.consumption_all_kgco2e_percap;
  	
  	document.getElementById("data_LSOA11").innerHTML = lsoadata.LSOA11;
  	document.getElementById("data_LSOA11NM").innerHTML = lsoadata.LSOA11NM;
  	document.getElementById("data_SOAC11NM").innerHTML = lsoadata.SOAC11NM;
  	document.getElementById("data_LAD17CD").innerHTML = lsoadata.LAD17CD;
  	document.getElementById("data_LAD17NM").innerHTML = lsoadata.LAD17NM;
  	
  	document.getElementById("data_total_emissions_grade").src = "images/grades/" + lsoadata.total_emissions_grade + ".jpg";
  	document.getElementById("data_total_emissions_grade").alt = "Grade " + lsoadata.total_emissions_grade;
  	document.getElementById("data_elec_emissions_grade").src  = "images/grades/" + lsoadata.elec_emissions_grade + ".jpg";
  	document.getElementById("data_elec_emissions_grade").alt = "Grade " + lsoadata.data_elec_emissions_grade;
  	document.getElementById("data_gas_emissions_grade").src   = "images/grades/" + lsoadata.gas_emissions_grade + ".jpg";
  	document.getElementById("data_gas_emissions_grade").alt = "Grade " + lsoadata.data_gas_emissions_grade;
  	document.getElementById("data_other_heating_emissions_grade").src   = "images/grades/" + lsoadata.other_heating_grade + ".jpg";
  	document.getElementById("data_other_heating_emissions_grade").alt = "Grade " + lsoadata.data_other_heating_emissions_grade;
  	document.getElementById("data_car_emissions_grade").src   = "images/grades/" + lsoadata.car_emissions_grade + ".jpg";
  	document.getElementById("data_car_emissions_grade").alt = "Grade " + lsoadata.data_car_emissions_grade;
  	document.getElementById("data_van_emissions_grade").src   = "images/grades/" + lsoadata.van_grade + ".jpg";
  	document.getElementById("data_van_emissions_grade").alt = "Grade " + lsoadata.data_van_emissions_grade;
  	document.getElementById("data_flights_emissions_grade").src   = "images/grades/" + lsoadata.flights_grade + ".jpg";
  	document.getElementById("data_flights_emissions_grade").alt = "Grade " + lsoadata.data_flights_emissions_grade;
  	document.getElementById("data_consumption_emissions_grade").src   = "images/grades/" + lsoadata.consumption_grade + ".jpg";
  	document.getElementById("data_consumption_emissions_grade").alt = "Grade " + lsoadata.data_consumption_emissions_grade;
  	
  	//Show waning Box
	  showwarnbox(lsoadata.LSOA11);
  }
  
	// Overall Chart
	
	if(overallChart){
	  if(isNaN(overallChart[Object.keys(overallChart)[0]])){
	    console.log("Safari Sucks");
	  } else {
	    overallChart.destroy();
	  }
	}
	
	if(lsoadata !== null){
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
	} else {
	  var overallctx = document.getElementById('overallChart').getContext('2d');
	overallChart = new Chart(overallctx, {
		type: 'bar',
		data: {
			labels: ['This Area','England Average'],
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
	}
	
	
	
	
	
};


