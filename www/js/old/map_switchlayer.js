function switchLayer(layer) {
  var layerId = document.getElementById("layerinput").value;
  //console.log(layerId);
  
  if (map.getLayer('lsoa')) map.removeLayer('lsoa');
  
  var matchExpression = ['match', ['get', 'LSOA11']];
  
  // Calculate color values for each LSOA
  carbondata.forEach(function (row) {
    // Convert the range of data values to a suitable color
    var rowVal = row[layerId];
    var color = [
  			'match',
  			['get', layerId],
  			'A+','#006837',
  			'A' ,'#1a9850',
  			'A-','#1a9850',
  			'B+','#91cf60',
  			'B' ,'#91cf60',
  			'B-','#91cf60',
  			'C+','#d9ef8b',
  			'C' ,'#d9ef8b',
  			'C-','#d9ef8b',
  			'D+','#fee08b',
  			'D' ,'#fee08b',
  			'D-','#fee08b',
  			'E+','#fc8d59',
  			'E' ,'#fc8d59',
  			'E-','#fc8d59',
  			'F+','#d73027',
  			'F' ,'#d73027',
  			'F-','#a50026',
  			/* other */ '#e0e0e0'
  			];
  	
  	matchExpression.push(row['LSOA11'], color);
  });
  
  // No Data Colour
  //matchExpression.push('rgba(0, 0, 0, 0)');
  matchExpression.push('#e0e0e0');

  map.addLayer({
  'id': 'lsoa',
  'type': 'fill',
  'source': 'lsoa',
  'source-layer': 'lsoa',
  "paint": {
          "fill-color": matchExpression,
          "fill-opacity": 0.7
        }
  });
  

}