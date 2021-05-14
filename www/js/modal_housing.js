var elecChart;
var gasChart;
var buildingageChart;
var buildingtypeChart;
var heatingChart;

function makeChartsHousing(lsoadata, la, england){
  
  if(la !== null){
    var lagasHistory = [
		la.gas_percap_2010,
		la.gas_percap_2011,
		la.gas_percap_2012,
		la.gas_percap_2013,
		la.gas_percap_2014,
		la.gas_percap_2015,
		la.gas_percap_2016,
		la.gas_percap_2017,
		la.gas_percap_2018
    ];
    
    var laelecHistory = [
		la.elec_percap_2010,
		la.elec_percap_2011,
		la.elec_percap_2012,
		la.elec_percap_2013,
		la.elec_percap_2014,
		la.elec_percap_2015,
		la.elec_percap_2016,
		la.elec_percap_2017,
		la.elec_percap_2018
    ];
    
    
    
  }
  
  var gasHistory = [
		lsoadata.gas_percap_2010,
		lsoadata.gas_percap_2011,
		lsoadata.gas_percap_2012,
		lsoadata.gas_percap_2013,
		lsoadata.gas_percap_2014,
		lsoadata.gas_percap_2015,
		lsoadata.gas_percap_2016,
		lsoadata.gas_percap_2017,
		lsoadata.gas_percap_2018
    ];
    
  
    
  var englandgasHistory = [
		england.gas_percap_2010,
		england.gas_percap_2011,
		england.gas_percap_2012,
		england.gas_percap_2013,
		england.gas_percap_2014,
		england.gas_percap_2015,
		england.gas_percap_2016,
		england.gas_percap_2017,
		england.gas_percap_2018
    ];
	
	var elecHistory = [
		lsoadata.elec_percap_2010,
		lsoadata.elec_percap_2011,
		lsoadata.elec_percap_2012,
		lsoadata.elec_percap_2013,
		lsoadata.elec_percap_2014,
		lsoadata.elec_percap_2015,
		lsoadata.elec_percap_2016,
		lsoadata.elec_percap_2017,
		lsoadata.elec_percap_2018
    ];
    
  
    
  var englandelecHistory = [
		england.elec_percap_2010,
		england.elec_percap_2011,
		england.elec_percap_2012,
		england.elec_percap_2013,
		england.elec_percap_2014,
		england.elec_percap_2015,
		england.elec_percap_2016,
		england.elec_percap_2017,
		england.elec_percap_2018
    ];
    
    
  var buildingageshare = [
		lsoadata.pP1900,
    lsoadata.p1900_18,
    lsoadata.p1919_29,
    lsoadata.p1930_39,
    lsoadata.p1945_54,             
    lsoadata.p1955_64,
    lsoadata.p1965_72,
    lsoadata.p1973_82,
    lsoadata.p1983_92,
    lsoadata.p1993_99,
    lsoadata.p2000_09,
    lsoadata.p2010_15,
    lsoadata.pUNKNOWN
    ];
    
  var buildingtypeshare = [
		lsoadata.Whole_House_Detached,
    lsoadata.Whole_House_Semi,
    lsoadata.Whole_House_Terraced,
    lsoadata.Flat_PurposeBuilt,
    lsoadata.Flat_Converted,             
    lsoadata.Flat_Commercial,
    lsoadata.Caravan
    ];
    
  var heatingShare = [
		lsoadata.pHeating_Gas,
    lsoadata.pHeating_Electric,
    lsoadata.pHeating_Oil,
    lsoadata.pHeating_Solid,
    lsoadata.pHeating_Other,             
    lsoadata.pHeating_None
    ];
    
    
  // Electric Chart
	if(elecChart){
		elecChart.destroy();
	}
		
	var elecctx = document.getElementById('elecChart').getContext('2d');
	if(la !== null) {
	  elecChart = new Chart(elecctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
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
		  legend: {position: 'bottom'},
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
	} else {
	  elecChart = new Chart(elecctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
			datasets: [{
				label: 'This Area',
				data: elecHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
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
		  legend: {position: 'bottom'},
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
	}
	
	
	
	
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
	
	if(la !== null) {
	  gasChart = new Chart(gasctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
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
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandgasHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.8)',
				borderColor: 'rgba(99, 255, 13, 1)',
				borderWidth: 1
			}]
		},
		options: {
		  legend: {position: 'bottom'},
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
	} else {
	  gasChart = new Chart(gasctx, {
		type: 'bar',
		data: {
			labels: ['2010', '2011', '2012', '2013', '2014', '2015','2016','2017','2018'],
			datasets: [{
				label: 'This Area',
				data: gasHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandgasHistory,
				backgroundColor: 'rgba(99, 255, 13, 0.8)',
				borderColor: 'rgba(99, 255, 13, 1)',
				borderWidth: 1
			}]
		},
		options: {
		  legend: {position: 'bottom'},
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
	}
	
	
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
				'rgba(45,0,75, 1)',
				'rgba(64,0,75, 1)',
				'rgba(118,42,131, 1)',
				'rgba(153,112,171, 1)',
				'rgba(194,165,207, 1)',
				'rgba(231,212,232, 1)',
				'rgba(247,247,247, 1)',
				'rgba(217,240,211, 1)',
				'rgba(166,219,160, 1)',
				'rgba(90,174,97, 1)',
				'rgba(27,120,55, 1)',
				'rgba(0,68,27, 1)',
				'rgba(128,128,128, 1)'
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
              '2000 to 2009',
              '2010 to 2015',
              'Unknown']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right',
        align: 'middle'
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
			  position: 'right',
        align: 'middle'
			}
		}
	});
    
}