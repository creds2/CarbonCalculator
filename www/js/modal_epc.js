// Declare Chart Values
var epcscoreChart;
var floorscoreChart;
var wallscoreChart;
var roofscoreChart; 
var windowscoreChart;
var mainheatscoreChart; 
var heatingcontrolscoreChart;
var mainheatdescscoreChart;
var epcbuildingtypeChart;
var epcoverviewChart;


makeChartsEPC = function(sub){
  
  // EPC Overview Chart
  var totalhouses = sub.Whole_House_Detached + sub.Whole_House_Semi + sub.Whole_House_Terraced + sub.Flat_PurposeBuilt +
  sub.Flat_Converted + sub.Flat_Commercial;
  
  var epcoverview = [sub.epc_total,sub.epc_newbuild,totalhouses];
	
	if(epcoverviewChart){
		epcoverviewChart.destroy();
	}
	
	var epcoverviewctx = document.getElementById('epcoverviewChart').getContext('2d');
	epcoverviewChart = new Chart(epcoverviewctx, {
		type: 'horizontalBar',
		data: {
			datasets: [{
				label: 'Number of Dwellings',
				data: epcoverview,
				backgroundColor: [
				'rgba(102,194,165, 1)',
				'rgba(252,141,98, 1)',
				'rgba(141,160,203, 1)',
				]
				
			}],
			
			labels: ['All properties with EPC','Newbuilds with EPC','Dwellings in 2011 Census']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
        xAxes: [{
            display: true,
            ticks: {
                beginAtZero: true
            }
        }]
      }
		}
	});
  
  
  // EPC Score Chart
  var epcscore = [sub.epc_A,sub.epc_B,sub.epc_C,
		sub.epc_D,sub.epc_E,sub.epc_F,sub.epc_G];
	
	if(epcscoreChart){
		epcscoreChart.destroy();
	}
	
	var epcscorectx = document.getElementById('epcscoreChart').getContext('2d');
	epcscoreChart = new Chart(epcscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'EPC Score',
				data: epcscore,
				backgroundColor: [
				'rgba(14,126,88, 1)',
				'rgba(42,164,91, 1)',
				'rgba(140,188,66, 1)',
				'rgba(246,204,21, 1)',
				'rgba(242,168,103, 1)',
				'rgba(241,126,35, 1)',
				'rgba(227,29,62, 1)'
				]
				
			}],
			
			labels: ['A','B','C','D','E','F','G']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	
	
	// EPC Wall Chart
  var wallscore = [sub.wall_verygood,sub.wall_good,sub.wall_average,
		sub.wall_poor,sub.wall_verypoor,sub.wall_other];
	
	if(wallscoreChart){
		wallscoreChart.destroy();
	}
	
	var wallscorectx = document.getElementById('wallscoreChart').getContext('2d');
	wallscoreChart = new Chart(wallscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'Walls Rating',
				data: wallscore,
				backgroundColor: [
				'rgba(44,123,182, 1)',
				'rgba(171,217,233, 1)',
				'rgba(255,255,191, 1)',
				'rgba(253,174,97, 1)',
				'rgba(215,25,28, 1)',
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	
	// EPC roof Chart
  var roofscore = [sub.roof_verygood,sub.roof_good,sub.roof_average,
		sub.roof_poor,sub.roof_verypoor,sub.roof_other,sub.roof_above];
	
	if(roofscoreChart){
		roofscoreChart.destroy();
	}
	
	var roofscorectx = document.getElementById('roofscoreChart').getContext('2d');
	roofscoreChart = new Chart(roofscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'roofs Rating',
				data: roofscore,
				backgroundColor: [
				'rgba(44,123,182, 1)',
				'rgba(171,217,233, 1)',
				'rgba(255,255,191, 1)',
				'rgba(253,174,97, 1)',
				'rgba(215,25,28, 1)',
				'rgba(192,192,192, 1)',
				'rgba(139, 33, 181, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing','Property Above']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	// EPC floor Chart
  var floorscore = [sub.floor_verygood,sub.floor_good,sub.floor_average,
		sub.floor_poor,sub.floor_verypoor,sub.floor_other,sub.floor_below];
	
	if(floorscoreChart){
		floorscoreChart.destroy();
	}
	
	var floorscorectx = document.getElementById('floorscoreChart').getContext('2d');
	floorscoreChart = new Chart(floorscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'floors Rating',
				data: floorscore,
				backgroundColor: [
				'rgba(44,123,182, 1)',
				'rgba(171,217,233, 1)',
				'rgba(255,255,191, 1)',
				'rgba(253,174,97, 1)',
				'rgba(215,25,28, 1)',
				'rgba(192,192,192, 1)',
				'rgba(139, 33, 181, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing','Property Below']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
  
  // EPC window Chart
  var windowscore = [sub.window_verygood,sub.window_good,sub.window_average,
		sub.window_poor,sub.window_verypoor,sub.window_other];
	
	if(windowscoreChart){
		windowscoreChart.destroy();
	}
	
	var windowscorectx = document.getElementById('windowscoreChart').getContext('2d');
	windowscoreChart = new Chart(windowscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'windows Rating',
				data: windowscore,
				backgroundColor: [
				'rgba(44,123,182, 1)',
				'rgba(171,217,233, 1)',
				'rgba(255,255,191, 1)',
				'rgba(253,174,97, 1)',
				'rgba(215,25,28, 1)',
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	// EPC mainheat Chart
  var mainheatscore = [sub.mainheat_verygood,sub.mainheat_good,sub.mainheat_average,
		sub.mainheat_poor,sub.mainheat_verypoor,sub.mainheat_other];
	
	if(mainheatscoreChart){
		mainheatscoreChart.destroy();
	}
	
	var mainheatscorectx = document.getElementById('mainheatscoreChart').getContext('2d');
	mainheatscoreChart = new Chart(mainheatscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'mainheats Rating',
				data: mainheatscore,
				backgroundColor: [
				'rgba(44,123,182, 1)',
				'rgba(171,217,233, 1)',
				'rgba(255,255,191, 1)',
				'rgba(253,174,97, 1)',
				'rgba(215,25,28, 1)',
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	// EPC heatingcontrol Chart
  var heatingcontrolscore = [sub.mainheatcontrol_verygood,sub.mainheatcontrol_good,sub.mainheatcontrol_average,
		sub.mainheatcontrol_poor,sub.mainheatcontrol_verypoor,sub.mainheatcontrol_other];
	
	if(heatingcontrolscoreChart){
		heatingcontrolscoreChart.destroy();
	}
	
	var heatingcontrolscorectx = document.getElementById('heatingcontrolscoreChart').getContext('2d');
	heatingcontrolscoreChart = new Chart(heatingcontrolscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'heatingcontrols Rating',
				data: heatingcontrolscore,
				backgroundColor: [
				'rgba(44,123,182, 1)',
				'rgba(171,217,233, 1)',
				'rgba(255,255,191, 1)',
				'rgba(253,174,97, 1)',
				'rgba(215,25,28, 1)',
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
	
	// EPC mainheatdesc Chart
  var mainheatdescscore = [
    sub.mainheatdesc_gasboiler,
    sub.mainheatdesc_oilboiler,
    sub.mainheatdesc_storageheater,
		sub.mainheatdesc_portableheater,
		sub.mainheatdesc_roomheater,
		sub.mainheatdesc_heatpump,
		sub.mainheatdesc_community,
		sub.mainheatdesc_other];
		
	if(mainheatdescscoreChart){
		mainheatdescscoreChart.destroy();
	}
	
	var mainheatdescscorectx = document.getElementById('mainheatdescscoreChart').getContext('2d');
	mainheatdescscoreChart = new Chart(mainheatdescscorectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'mainheatdescs Rating',
				data: mainheatdescscore,
				backgroundColor: [
				'rgba(166,86,40, 1)',
				'rgba(255,255,51, 1)',
				'rgba(255,127,0, 1)',
				'rgba(152,78,163, 1)',
				'rgba(228,26,28, 1)',
				'rgba(77,175,74, 1)',
				'rgba(55,126,184, 1)',
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['Gas Boiler','Oil Boiler','Storage Heater','Portable Heater','Room Heater',
			'Heat Pump','Community Heating','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
	
		// EPC mainheatdesc Chart
  var epcbuildingtype = [
    sub.type_house_semi,
    sub.type_house_midterrace,
    sub.type_house_endterrace,
		sub.type_house_detached,
		sub.type_flat,
		sub.type_maisonette,
		sub.type_parkhome,
		sub.type_other,
		sub.type_bungalow];

	if(epcbuildingtypeChart){
		epcbuildingtypeChart.destroy();
	}
	
	var epcbuildingtypectx = document.getElementById('epcbuildingtypeChart').getContext('2d');
	epcbuildingtypeChart = new Chart(epcbuildingtypectx, {
		type: 'pie',
		data: {
			datasets: [{
				label: 'epcbuildingtype Rating',
				data: epcbuildingtype,
				backgroundColor: [
				'rgba(166,86,40, 1)',
				'rgba(255,255,51, 1)',
				'rgba(255,127,0, 1)',
				'rgba(152,78,163, 1)',
				'rgba(228,26,28, 1)',
				'rgba(77,175,74, 1)',
				'rgba(55,126,184, 1)',
				'rgba(192,192,192, 1)',
				'rgba(247,129,191, 1)',
				]
				
			}],
			
			labels: ['Semi-Detached','Mid Terrace','End Terrace','Detached','Flat',
			'Maisonette','Park home','Other/Missing','Bungalow']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend : {
			  position: 'right'
			}
		}
	});
  
};


