// Declare Chart Values
var elecChart;
var gasChart;
var t2wChart;

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






