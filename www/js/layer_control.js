function toggleLayer(layerName){
  var checkBox = document.getElementById(layerName.concat('checkbox'));
  // If the checkbox is checked add the layer to the map
  if (checkBox.checked === true){
    switch(layerName) {
      case 'carbon':
        // code block
        var layerId = document.getElementById("layerinput").value;
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
        },  'landcover_grass' /*'housenumber'*/
        );
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
      default:
        console.log('unknown layer selected');
    } 
  } else {
    if (map.getLayer(layerName)) map.removeLayer(layerName);
  }
} 

function switchLayer(layer) {
  var layerId = document.getElementById("layerinput").value;
  var layers = map.getStyle().layers;
  
  if (map.getLayer('carbon')) map.removeLayer('carbon');
  
  switchLayerDesc();
  
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
  },  'landcover_grass' /*'housenumber'*/
  );
  

}

