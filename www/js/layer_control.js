

function toggleLayer(layerName){
  var checkBox = document.getElementById(layerName.concat('checkbox'));
  // If the checkbox is checked add the layer to the map
  if (checkBox.checked === true){
    switch(layerName) {
      case 'carbon':
        // code block
        switchLayer();
        break;
      case 'la':
        // code block
        map.addLayer({
            'id': 'la',
            'type': 'line',
            'source': 'la',
            'source-layer': 'la',
            'paint': {
              'line-color': 'rgba(0, 0, 0, 1)',
              'line-width': 2
            }
        });
        break;
      case 'transitstops':
        // code block
        map.addLayer({
            'id': 'transitstops',
            'type': 'circle',
            'source': 'transitstops',
            'source-layer': 'transitstops',
            'paint': {
              // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                'base': 2.5,
                'stops': [
                  [8, 3],
                  [22, 180]
                ]
              },
              // color circles by ethnicity, using a match expression
              // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
              'circle-stroke-width': 1,
              "circle-color": [
          			'match',
          			['get', 'grade'],
          			'A+','#313695',
          			'A','#4575b4',
          			'A-','#4575b4',
          			'B+','#74add1',
          			'B','#abd9e9',
          			'B-','#abd9e9',
          			'C+','#e0f3f8',
          			'C','#e0f3f8',
          			'C-','#ffffbf',
          			'D+','#ffffbf',
          			'D','#fee090',
          			'D-','#fee090',
          			'E+','#fdae61',
          			'E','#fdae61',
          			'E-','#f46d43',
          			'F+','#d73027',
          			'F','#d73027',
          			'F-','#a50026',
          			/* other */ '#e0e0e0'
          			]
            }
        });
        break;
      case 'centroids':
        // code block
        map.addLayer({
            'id': 'centroids',
            'type': 'circle',
            'source': 'centroids',
            'source-layer': 'centroids',
            'paint': {
              // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                'base': 3,
                'stops': [
                  [10, 5],
                  [22, 180]
                ]
              },
              // color circles by ethnicity, using a match expression
              // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
              'circle-color': '#000000'
            }
        });
        break;
      default:
        console.log('unknown layer selected');
    } 
  } else {
    if (map.getLayer(layerName)) map.removeLayer(layerName);
    if(layerName == 'carbon'){
      document.getElementById("legend").innerHTML = ``;
    }
  }
}

function removeisochrones(){
  if (map.getLayer('isochrones')){
    console.log("removed layer");
    map.removeLayer('isochrones');
    
  }
  
  if(map.getSource('isochrones')){
    console.log("removed source");
    map.removeSource('isochrones');
  }
}

function switchLayer(layer) {
  
  var checkBox = document.getElementById('carboncheckbox');
  var layerId = document.getElementById("layerinput").value;
  var filterid = document.getElementById("layerfilter").value;
  var layers = map.getStyle().layers;
  
  if (checkBox.checked === true){
    if (map.getLayer('carbon')) map.removeLayer('carbon');
  
    switchLayerDesc();
    
    switch(layerId) {
      case 'SOAC11NM':
        // code block
        
        document.getElementById("legend").innerHTML = `<h4>Office for National Statistics Area Classifications</h4>
        <div><span style="background-color: #955123"></span>Cosmopolitan student neighbourhoods</div>
  			<div><span style="background-color: #007f42"></span>Ageing rural neighbourhoods</div>
  			<div><span style="background-color: #3ea456"></span>Prospering countryside life</div>
  			<div><span style="background-color: #8aca8e"></span>Remoter communities</div>
  			<div><span style="background-color: #cfe8d1"></span>Rural traits</div>
  			<div><span style="background-color: #00498d"></span>Achieving neighbourhoods</div>
  			<div><span style="background-color: #2967ad"></span>Asian traits</div>
  			<div><span style="background-color: #7b99c7"></span>Highly qualified professionals</div>
  			<div><span style="background-color: #b9c8e1"></span>Households in terraces and flats</div>
  			<div><span style="background-color: #e3ac20"></span>Challenged white communities</div>
  			<div><span style="background-color: #edca1a"></span>Constrained renters</div>
  			<div><span style="background-color: #f6e896"></span>Hampered neighbourhoods</div>
  			<div><span style="background-color: #fcf5d8"></span>Hard-pressed flat dwellers</div>
  			<div><span style="background-color: #e64c2b"></span>Ageing urban communities</div>
  			<div><span style="background-color: #ec773c"></span>Aspiring urban households</div>
  			<div><span style="background-color: #faa460"></span>Comfortable neighbourhoods</div>
  			<div><span style="background-color: #fcc9a0"></span>Endeavouring social renters</div>
  			<div><span style="background-color: #fee4ce"></span>Primary sector workers</div>
  			<div><span style="background-color: #f79ff0"></span>Inner city cosmopolitan</div>
  			<div><span style="background-color: #6a339a"></span>Urban cultural mix</div>
  			<div><span style="background-color: #9f84bd"></span>Young ethnic communities</div>
  			<div><span style="background-color: #576362"></span>Affluent communities</div>
  			<div><span style="background-color: #a1a2a1"></span>Ageing suburbanites</div>
  			<div><span style="background-color: #e5e4e3"></span>Comfortable suburbia</div>`;
    		
    		
        if(filterid == 'all'){
          map.addLayer(
          {
          'id': 'carbon',
          'type': 'fill',
          'source': 'carbon',
          'source-layer': 'carbon',
          "paint": {
                  "fill-color": [
          			'match',
          			['get', layerId],
          			"Cosmopolitan student neighbourhoods",'#955123',
          			"Ageing rural neighbourhoods",'#007f42',
          			"Prospering countryside life",'#3ea456',
          			"Remoter communities",'#8aca8e',
          			"Rural traits",'#cfe8d1',
          			"Achieving neighbourhoods",'#00498d',
          			"Asian traits",'#2967ad',
          			"Highly qualified professionals",'#7b99c7',
          			"Households in terraces and flats",'#b9c8e1',
          			"Challenged white communities",'#e3ac20',
          			"Constrained renters",'#edca1a',
          			"Hampered neighbourhoods",'#f6e896',
          			"Hard-pressed flat dwellers",'#fcf5d8',
          			"Ageing urban communities",'#e64c2b',
          			"Aspiring urban households",'#ec773c',
          			"Comfortable neighbourhoods",'#faa460',
          			"Endeavouring social renters",'#fcc9a0',
          			"Primary sector workers",'#fee4ce',
          			"Inner city cosmopolitan",'#f79ff0',
          			"Urban cultural mix",'#6a339a',
          			"Young ethnic communities",'#9f84bd',
          			"Affluent communities",'#576362',
          			"Ageing suburbanites",'#a1a2a1',
          			"Comfortable suburbia",'#e5e4e3',
                /* other */ '#ffffff'
          			],
                  "fill-opacity": 0.7,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
                }
          },  'waterlines' /*'landcover_grass'*/
          );
        } else {
          map.addLayer(
          {
          'id': 'carbon',
          'type': 'fill',
          'source': 'carbon',
          'source-layer': 'carbon',
          'filter': ['==', 'SOAC11NM', filterid],
          "paint": {
                  "fill-color": [
          			'match',
          			['get', layerId],
          			"Cosmopolitan student neighbourhoods",'#955123',
          			"Ageing rural neighbourhoods",'#007f42',
          			"Prospering countryside life",'#3ea456',
          			"Remoter communities",'#8aca8e',
          			"Rural traits",'#cfe8d1',
          			"Achieving neighbourhoods",'#00498d',
          			"Asian traits",'#2967ad',
          			"Highly qualified professionals",'#7b99c7',
          			"Households in terraces and flats",'#b9c8e1',
          			"Challenged white communities",'#e3ac20',
          			"Constrained renters",'#edca1a',
          			"Hampered neighbourhoods",'#f6e896',
          			"Hard-pressed flat dwellers",'#fcf5d8',
          			"Ageing urban communities",'#e64c2b',
          			"Aspiring urban households",'#ec773c',
          			"Comfortable neighbourhoods",'#faa460',
          			"Endeavouring social renters",'#fcc9a0',
          			"Primary sector workers",'#fee4ce',
          			"Inner city cosmopolitan",'#f79ff0',
          			"Urban cultural mix",'#6a339a',
          			"Young ethnic communities",'#9f84bd',
          			"Affluent communities",'#576362',
          			"Ageing suburbanites",'#a1a2a1',
          			"Comfortable suburbia",'#e5e4e3',
                /* other */ '#ffffff'
          			],
                  "fill-opacity": 0.7,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.2)'
                }
          },  'waterlines' /*'landcover_grass'*/
          );
        }
        
        break;
      case 'EPCScore':
        // code block
        
        document.getElementById("legend").innerHTML = `<h4>EPC Scores</h4>
        <div><span style="background-color: #0e7e58"></span>A 92-100</div>
  			<div><span style="background-color: #2aa45b"></span>B 81-91</div>
  			<div><span style="background-color: #8cbc42"></span>C 69-80</div>
  			<div><span style="background-color: #f6cc15"></span>D 55-86</div>
  			<div><span style="background-color: #f2a867"></span>E 39-54</div>
  			<div><span style="background-color: #f17e23"></span>F 21-38</div>
  			<div><span style="background-color: #e31d3e"></span>G 1-20</div>`;
    		
    		
        if(filterid == 'all'){
          map.addLayer(
          {
          'id': 'carbon',
          'type': 'fill',
          'source': 'carbon',
          'source-layer': 'carbon',
          "paint": {
                  'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'epc_score_avg'],
                        0,'#e31d3e',
                        21,'#f17e23',
                        39,'#f2a867',
                        55,'#f6cc15',
                        69,'#8cbc42',
                        81,'#2aa45b',
                        92,'#0e7e58'
                        ],
                  'fill-outline-color': 'rgba(0, 0, 0, 0.2)',
                  'fill-opacity': 0.7
                }
          },  'waterlines'
          );
        } else {
          map.addLayer(
          {
          'id': 'carbon',
          'type': 'fill',
          'source': 'carbon',
          'source-layer': 'carbon',
          'filter': ['==', 'SOAC11NM', filterid],
          "paint": {
                  'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'epc_score_avg'],
                        0,'#e31d3e',
                        21,'#f17e23',
                        39,'#f2a867',
                        55,'#f6cc15',
                        69,'#8cbc42',
                        81,'#2aa45b',
                        92,'#0e7e58'
                        ],
                  'fill-outline-color': 'rgba(0, 0, 0, 0.2)',
                  'fill-opacity': 0.7
                }
          },  'waterlines'
          );
        }
        
        break;
      default:
        // One of the grades layers 
        document.getElementById("legend").innerHTML = `<h4>Grades</h4>
        <div><span style="background-color: #313695"></span>A+ (best 1%)</div>
    		<div><span style="background-color: #4575b4"></span>A</div>
    		<div><span style="background-color: #4575b4"></span>A- (best 10%)</div>
    		<div><span style="background-color: #74add1"></span>B+</div>
    		<div><span style="background-color: #abd9e9"></span>B</div>
    		<div><span style="background-color: #abd9e9"></span>B-</div>
    		<div><span style="background-color: #e0f3f8"></span>C+</div>
    		<div><span style="background-color: #e0f3f8"></span>C</div>
    		<div><span style="background-color: #ffffbf"></span>C- (just above average)</div>
    		<div><span style="background-color: #ffffbf"></span>D+ (just below average)</div>
    		<div><span style="background-color: #fee090"></span>D</div>
    		<div><span style="background-color: #fee090"></span>D-</div>
    		<div><span style="background-color: #fdae61"></span>E+</div>
    		<div><span style="background-color: #fdae61"></span>E</div>
    		<div><span style="background-color: #f46d43"></span>E-</div>
    		<div><span style="background-color: #d73027"></span>F+ (worst 10%)</div>
    		<div><span style="background-color: #d73027"></span>F</div>
    		<div><span style="background-color: #a50026"></span>F- (worst 1%)</div>
    		<div><span style="background-color: #e0e0e0"></span>No Data</div>`;
        
        if(filterid == 'all'){
          map.addLayer(
          {
          'id': 'carbon',
          'type': 'fill',
          'source': 'carbon',
          'source-layer': 'carbon',
          "paint": {
                  "fill-color": [
          			'match',
          			['get', layerId],
          			'A+','#313695',
          			'A','#4575b4',
          			'A-','#4575b4',
          			'B+','#74add1',
          			'B','#abd9e9',
          			'B-','#abd9e9',
          			'C+','#e0f3f8',
          			'C','#e0f3f8',
          			'C-','#ffffbf',
          			'D+','#ffffbf',
          			'D','#fee090',
          			'D-','#fee090',
          			'E+','#fdae61',
          			'E','#fdae61',
          			'E-','#f46d43',
          			'F+','#d73027',
          			'F','#d73027',
          			'F-','#a50026',
          			/* other */ '#e0e0e0'
          			],
                  "fill-opacity": 0.7,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.5)'
                }
          },  'waterlines'/*'roads' /* /*'landcover_grass'*/
          );
        } else {
          map.addLayer(
          {
          'id': 'carbon',
          'type': 'fill',
          'source': 'carbon',
          'source-layer': 'carbon',
          'filter': ['==', 'SOAC11NM', filterid],
          "paint": {
                  "fill-color": [
          			'match',
          			['get', layerId],
          			'A+','#313695',
          			'A','#4575b4',
          			'A-','#4575b4',
          			'B+','#74add1',
          			'B','#abd9e9',
          			'B-','#abd9e9',
          			'C+','#e0f3f8',
          			'C','#e0f3f8',
          			'C-','#ffffbf',
          			'D+','#ffffbf',
          			'D','#fee090',
          			'D-','#fee090',
          			'E+','#fdae61',
          			'E','#fdae61',
          			'E-','#f46d43',
          			'F+','#d73027',
          			'F','#d73027',
          			'F-','#a50026',
          			/* other */ '#e0e0e0'
          			],
                  "fill-opacity": 0.7,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.5)'
                }
          },  'waterlines'/*'roads' /* /*'landcover_grass'*/
          );
        }
        
        
    }
    
    
  } else {
    document.getElementById("legend").innerHTML = ``;
  }
}

// Swtich the basemap
/*
function switchBase(layer) {
  var layerId = document.getElementById("basemapinput").value;
  map.setStyle('tiles/oszoom/' + layerId + '.json');
  
  map.addSource('carbon', {
  	'type': 'vector',
  	'tiles': [
  	'https://www.carbon.place/tiles/carbon/{z}/{x}/{y}.pbf'
  	],
  	'minzoom': 4,
  	'maxzoom': 13
  });
  
  map.addSource('la', {
  	'type': 'vector',
  	'tiles': [
  	'https://www.carbon.place/tiles/la/{z}/{x}/{y}.pbf'
  	],
  	'minzoom': 4,
  	'maxzoom': 13
  });
  
  map.addSource('busstops', {
  	'type': 'vector',
  	'tiles': [
  	'https://www.carbon.place/tiles/busstops/{z}/{x}/{y}.pbf'
  	],
  	'minzoom': 8,
  	'maxzoom': 13
  });
  
  map.addSource('centroids', {
  	'type': 'vector',
  	'tiles': [
  	'https://www.carbon.place/tiles/centroids/{z}/{x}/{y}.pbf'
  	],
  	'minzoom': 6,
  	'maxzoom': 13
  });
  
  
  toggleLayer('carbon');
  toggleLayer('la');
  toggleLayer('busstops');
  toggleLayer('centroids');
}
*/

