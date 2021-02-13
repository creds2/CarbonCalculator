// Declare Chart Values
var epcscoreChart;
var floorscoreChart;
var wallscoreChart;
var roofscoreChart; 
var windowscoreChart;

var epcscorectx = document.getElementById('epcscoreChart').getContext('2d');

makeChartsEPC = function(sub){
  
  // EPC Score Chart
  var epcscore = [sub.epc_A,sub.epc_B,sub.epc_C,
		sub.epc_D,sub.epc_E,sub.epc_F,sub.epc_G,sub.epc_other];
	
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
				'rgba(227,29,62, 1)',
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['A','B','C','D','E','F','G','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
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
			maintainAspectRatio: false
		}
	});
	
	
	// EPC roof Chart
  var roofscore = [sub.roof_verygood,sub.roof_good,sub.roof_average,
		sub.roof_poor,sub.roof_verypoor,sub.roof_other];
	
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
				'rgba(192,192,192, 1)'
				]
				
			}],
			
			labels: ['Very Good','Good','Average','Poor','Very Poor','Other/Missing']
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});
  
  
};


