// Setup Map
mapboxgl.accessToken = "NotNeeded";
  var map = new mapboxgl.Map({
  container: 'map', 
  style: 'tiles/style.json', 
  center: [-1.548, 53.795], 
  zoom: 10 
});

map.on('load', function() {
  map.addSource('lsoa', {
  	'type': 'vector',
  	'tiles': [
  	'https://www.wisemover.co.uk/carbon/tiles/lsoa/{z}/{x}/{y}.pbf'
  	],
  	'minzoom': 4,
  	'maxzoom': 13
  });

  map.addControl(new mapboxgl.NavigationControl());
  
  map.addLayer( {
  'id': 'lsoa',
  'type': 'fill',
  'source': 'lsoa',
  'source-layer': 'lsoa',
  "paint": {
          "fill-color": '#e0e0e0',
          "fill-opacity": 0.7
        }
  });


});






