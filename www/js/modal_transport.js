// Declare Chart Values
var carChart;
var vanChart;
var t2wChart;
var t2sChart;
var co2perkmChart;
var t2wDistChart;

makeChartsTransport = function(sub, la, england){
  
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
    
  var t2wDistshare = [
		sub.km_Bus,
		sub.km_CarOrVan,
		sub.km_Bicycle,
		sub.km_OnFoot,
		
		sub.km_Motorcycle,
		sub.km_Underground,
		sub.km_OtherMethod,
		sub.km_Passenger,
		sub.km_Taxi,
		sub.km_Train
    ];
    
  var t2sshare = [
		sub.T2S_bicycle,
		sub.T2S_foot,
		sub.T2S_car
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
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lacarHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.8)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandcarHistory,
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
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lavanHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.8)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandvanHistory,
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
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: laco2perkmHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.8)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandco2perkmHistory,
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
				backgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			},
			{
				label: 'Local Authority Average',
				data: lacarpercapHistory,
				backgroundColor: 'rgba(132, 99, 255, 0.8)',
				borderColor: 'rgba(132, 99, 255, 1)',
				borderWidth: 1
			},
			{
				label: 'England Average',
				data: englandcarpercapHistory,
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
	
	
	// Travel to Work Distance Modeshare
	if(t2wDistChart){
		t2wDistChart.destroy();
	}
	
	var t2wDistctx = document.getElementById('t2wDistChart').getContext('2d');
	t2wDistChart = new Chart(t2wDistctx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Main mode of travel to work',
				data: t2wDistshare,
				backgroundColor: [
				'rgba(166,206,227, 1)',
				'rgba(31,120,180, 1)',
				'rgba(178,223,138, 1)',
				'rgba(51,160,44, 1)',
				
				'rgba(227,26,28, 1)',
				'rgba(253,191,111, 1)',
				'rgba(255,127,0, 1)',
				'rgba(202,178,214, 1)',
				'rgba(106,61,154, 1)',
				'rgba(255,255,153, 1)'
				]
				
			}],
			
			labels: ['Bus','Car Driver','Cycle','Walk',
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
	
	
};


