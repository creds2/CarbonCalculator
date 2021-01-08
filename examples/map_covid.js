// Setup Map
mapboxgl.accessToken = "NotNeeded";
var map = new mapboxgl.Map({
container: 'map', // container id
style: '/tiles/style_carbon_backonly.json', // stylesheet location
center: [-1.5, 52], // starting position [lng, lat]
zoom: 7, // starting zoom
maxZoom: 13
});

// console.log("Hello");

// Get the Average Data
//function getAverages() {
//  return $.getJSON('https://www.wisemover.co.uk/creds/covid/average_cases.json');
//}

var covidAverage = [];
$.getJSON("/creds/covid/average_cases.json", function (json) {
    covidAverage.push(json);
});


//var covidAverage = [];
//var xmlhttp = new XMLHttpRequest();
//xmlhttp.onreadystatechange = function() {
//  if (this.readyState == 4 && this.status == 200) {
//    var myObj = JSON.parse(this.responseText);
//    //console.log(myObj);
//    window.covidAverage = myObj;
//  }
//};
//xmlhttp.open("GET", "/creds/covid/average_cases.json", true);
//xmlhttp.send();


//var covidAverage = $.getJSON('https://www.wisemover.co.uk/creds/covid/average_cases.json', //function() {
//  console.log( "got json" );
//});
//covidAverage = JSON.parse(covidAverage);
//console.log(covidAverage);


var covidChart;

map.on('load', function() {

var layers = map.getStyle().layers;
// Find the index of the first symbol layer in the map style
var firstSymbolId;
for (var i = 0; i < layers.length; i++) {
  if (layers[i].type === 'symbol') {
    firstSymbolId = layers[i].id;
    break;
  }
}

map.addSource('covid', {
	'type': 'vector',
	'tiles': [
	'https://www.wisemover.co.uk/tiles/covid/{z}/{x}/{y}.pbf'
	],
	'minzoom': 1,
	'maxzoom': 13
});
map.addLayer(
{
'id': 'covid',
'type': 'fill',
'source': 'covid',
'source-layer': 'covid',
"paint": {
        'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'rolling'],
            0,'#D3D3D3',
            5,'#313695',
            10,'#4575b4',
            20,'#74add1',
            30,'#abd9e9',
            40,'#e0f3f8',
            50,'#ffffbf',
            75,'#fee090',
            100,'#fdae61',
            200,'#f46d43',
            500,'#d73027',
            1000,'#a50026'
            ],
        "fill-opacity": 0.7,
        'fill-outline-color': 'rgba(0, 0, 0, 0.5)'
      }
}, firstSymbolId
);
});

map.addControl(new mapboxgl.NavigationControl());

// var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');
//var inputs = document.getElementById("input").value;
//console.log(inputs);


function switchLayer(layer) {
  var layerId = document.getElementById("input").value;
  // console.log(layerId);

  var layers = map.getStyle().layers;
  // Find the index of the first symbol layer in the map style
  var firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId = layers[i].id;
      break;
    }
  }


  if (map.getLayer('covid')) map.removeLayer('covid');

  if (layerId == "change_lastwk" || layerId == "change_lastmt") {

    document.getElementById("covid-legend").innerHTML = `<h4>Cases</h4>
      <div><span style="background-color: #4575b4"></span>-100%</div>
      <div><span style="background-color: #91bfdb"></span>-50%</div>
      <div><span style="background-color: #e0f3f8"></span>-10%</div>
      <div><span style="background-color: #ffffbf"></span>0%</div>
      <div><span style="background-color: #fee090"></span>10%</div>
      <div><span style="background-color: #fdae61"></span>50%</div>
      <div><span style="background-color: #f46d43"></span>100%</div>
      <div><span style="background-color: #d73027"></span>200%</div>
      <div><span style="background-color: #a50026"></span>1000+%</div>`;

    map.addLayer(
    {
    'id': 'covid',
    'type': 'fill',
    'source': 'covid',
    'source-layer': 'covid',
    "paint": {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', layerId],
                -100,'#4575b4',
                -50,'#91bfdb',
                -10,'#e0f3f8',
                0,'#ffffbf',
                10,'#fee090',
                50,'#fdae61',
                100,'#f46d43',
                200,'#d73027',
                1000,'#a50026'
                ],
            "fill-opacity": 0.7,
            'fill-outline-color': 'rgba(169, 169, 169, 0.5)'
          }
    }, firstSymbolId
    );
  } else {

    document.getElementById("covid-legend").innerHTML = `<h4>Cases</h4>
      <div><span style="background-color: #D3D3D3"></span>0-2</div>
      <div><span style="background-color: #313695"></span>5</div>
      <div><span style="background-color: #4575b4"></span>10</div>
      <div><span style="background-color: #74add1"></span>20</div>
      <div><span style="background-color: #abd9e9"></span>30</div>
      <div><span style="background-color: #e0f3f8"></span>40</div>
      <div><span style="background-color: #ffffbf"></span>50</div>
      <div><span style="background-color: #fee090"></span>75</div>
      <div><span style="background-color: #fdae61"></span>100</div>
      <div><span style="background-color: #f46d43"></span>200</div>
      <div><span style="background-color: #d73027"></span>500</div>
      <div><span style="background-color: #a50026"></span>1000+</div>`;

    map.addLayer(
    {
    'id': 'covid',
    'type': 'fill',
    'source': 'covid',
    'source-layer': 'covid',
    "paint": {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', layerId],
                0,'#D3D3D3',
                5,'#313695',
                10,'#4575b4',
                20,'#74add1',
                30,'#abd9e9',
                40,'#e0f3f8',
                50,'#ffffbf',
                75,'#fee090',
                100,'#fdae61',
                200,'#f46d43',
                500,'#d73027',
                1000,'#a50026'
                ],
            "fill-opacity": 0.7,
            'fill-outline-color': 'rgba(0, 0, 0, 0.5)'
          }
    }, firstSymbolId
    );
  }

}

//for (var i = 0; i < inputs.length; i++) {
//  inputs[i].onclick = switchLayer;
//}

// When a click event occurs on a feature in the states layer, open a popup at the
// location of the click, with description HTML from its properties.
//map.on('click', 'covid', function(e) {
//  new mapboxgl.Popup()
//  .setLngLat(e.lngLat)
//  .setHTML(e.features[0].properties.total)
//  .addTo(map);
//});


// On click open modal
map.on('click', 'covid', function(e) {

	modal.style.display = "block";

	var covidHistory = [
  e.features[0].properties.wk_11,
  e.features[0].properties.wk_12,
  e.features[0].properties.wk_13,
  e.features[0].properties.wk_14,
  e.features[0].properties.wk_15,
  e.features[0].properties.wk_16,
  e.features[0].properties.wk_17,
  e.features[0].properties.wk_18,
  e.features[0].properties.wk_19,
  e.features[0].properties.wk_20,
  e.features[0].properties.wk_21,
  e.features[0].properties.wk_22,
  e.features[0].properties.wk_23,
  e.features[0].properties.wk_24,
  e.features[0].properties.wk_25,
  e.features[0].properties.wk_26,
  e.features[0].properties.wk_27,
  e.features[0].properties.wk_28,
  e.features[0].properties.wk_29,
  e.features[0].properties.wk_30,
  e.features[0].properties.wk_31,
  e.features[0].properties.wk_32,
  e.features[0].properties.wk_33,
  e.features[0].properties.wk_34,
  e.features[0].properties.wk_35,
  e.features[0].properties.wk_36,
  e.features[0].properties.wk_37,
  e.features[0].properties.wk_38,
  e.features[0].properties.wk_39,
  e.features[0].properties.wk_40,
  e.features[0].properties.wk_41,
  e.features[0].properties.wk_42,
  e.features[0].properties.wk_43,
  e.features[0].properties.wk_44,
  e.features[0].properties.wk_45,
  e.features[0].properties.wk_46,
  e.features[0].properties.wk_47,
  e.features[0].properties.wk_48,
  e.features[0].properties.wk_49,
  e.features[0].properties.wk_50,
  e.features[0].properties.wk_51,
  e.features[0].properties.wk_52,
  ];





  means = jQuery.map(covidAverage[0], function(n, i){
    return n.mean;
  });

  q1 = jQuery.map(covidAverage[0], function(n, i){
    return n.q1;
  });

  q3 = jQuery.map(covidAverage[0], function(n, i){
    return n.q3;
  });

	// Define Charts

	if(covidChart){
		covidChart.destroy();
	}


	var covidctx = document.getElementById('covidChart').getContext('2d');
	covidChart = new Chart(covidctx, {
		type: 'bar',
		data: {
			labels: ['Week 11','Week 12','Week 13','Week 14','Week 15','Week 16','Week 17','Week 18','Week 19',
			         'Week 20','Week 21','Week 22','Week 23','Week 24','Week 25','Week 26','Week 27','Week 28','Week 29',
			         'Week 30','Week 31','Week 32','Week 33','Week 34','Week 35','Week 36','Week 37','Week 38','Week 39',
			         'Week 40','Week 41','Week 42','Week 43','Week 44','Week 45','Week 46','Week 47','Week 48','Week 49',
			         'Week 50','Week 51','Week 52'],
			datasets: [{
			  label: 'England Average',
				data: means,
				fill: false,
				type: 'line'
			}, {
			  label: 'England Top 75%',
				data: q3,
				fill: 0,
				type: 'line'
			}, {
			  label: 'England Bottom 25%',
				data: q1,
				fill: 0,
				type: 'line'
			},{
				label: 'This MSOA',
				data: covidHistory,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				type: 'bar'
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

// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'covid', function() {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'covid', function() {
  map.getCanvas().style.cursor = '';
});