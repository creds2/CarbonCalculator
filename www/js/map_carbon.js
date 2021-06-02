// Setup Map
mapboxgl.accessToken = "NotNeeded";
var map = new mapboxgl.Map({
container: 'map',
style: 'tiles/oszoom/style_light.json' ,
center: [-0.151, 51.482],
zoom: 7,
maxZoom: 13,
minZoom: 4
});

const createButton = (text, onclick) => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'searchbutton');
    button.appendChild(document.createTextNode(text));
    button.addEventListener('click', onclick);
    return button;
};
const returnButton = createButton('Search', (ev) => {
    // map.setCenter(centerMarker.getLngLat());
    //console.log(document.getElementById('searchid').value);
    var OSMlocation = '';
    var OSMurl = 'https://nominatim.openstreetmap.org/search?q=' +
    document.getElementById('searchid').value + '&format=json&limit=1&countrycodes=gb';
    $.getJSON(OSMurl, function (json) {
      OSMlocation = json;
      
    })
      .done(function() {
        //Hide Spinner
        
        $('#loader').hide();
        console.log("found " + OSMlocation[0].lon + " " + OSMlocation[0].lat);
        //Move map
        map.flyTo({
          center: [OSMlocation[0].lon, OSMlocation[0].lat],
          zoom: 11,
          essential: true
          });

      })
      .fail(function() {
        alert("Failed to search for location, please try refreshing the page");
      });
    
    
});
const mapboxglSearchControl = {
    onAdd: (map) => {
        const seachbox = document.createElement('div');
        seachbox.classList.add('custom-control', 'mapboxgl-ctrl');
        seachbox.classList.add('custom-control-search');
        const i = document.createElement('input');
        i.type = 'text';
        i.id = 'searchid';
        i.className = 'custom-control-search-input';
        seachbox.appendChild(i);
        seachbox.appendChild(returnButton);
        return seachbox;
    },
    getDefaultPosition: () => {
        return 'top-right';
    },
    onRemove: () => {
        map.off('moveend', updateLatLon);
    }
};

map.on('load', function() {
map.addSource('carbon', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/carbon/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

//toggleLayer('carbon');

document.getElementById("legend").innerHTML = `<button onclick="showlegend(false)" style="float:right" aria-label="Hide legend"><i class="fas fa-times"></i></button>
<h4>Grades</h4>
<div><span style="background-color: #313695"></span>A+ (best 1%)</div>
<div><span style="background-color: #4575b4"></span>A</div>
<div><span style="background-color: #4575b4"></span>A- (best 10%)</div>
<div><span style="background-color: #74add1"></span>B+</div>
<div><span style="background-color: #abd9e9"></span>B</div>
<div><span style="background-color: #abd9e9"></span>B-</div>
<div><span style="background-color: #e0f3f8"></span>C+</div>
<div><span style="background-color: #e0f3f8"></span>C</div>
<div><span style="background-color: #ffffbf"></span>C- (above average)</div>
<div><span style="background-color: #ffffbf"></span>D+ (below average)</div>
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
			['get', 'total_emissions_grade'],
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

map.addControl(mapboxglSearchControl);
map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(new mapboxgl.AttributionControl({
customAttribution: 'Contains OS data © Crown copyright 2021'
}));

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
,'top-left');


// Add Scale bar
map.addControl(new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
}),'bottom-right');

map.addSource('la', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/la/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('parish', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/parish/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('constituencies', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/constituencies/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('wards', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/wards/{z}/{x}/{y}.pbf'
	],
	'minzoom': 4,
	'maxzoom': 13
});

map.addSource('transitstops', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/transitstops/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 14
});

map.addSource('centroids', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/centroids/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 13
});

map.addSource('pct', {
	'type': 'vector',
	'tiles': [
	'https://www.carbon.place/tiles/pct/{z}/{x}/{y}.pbf'
	],
	'minzoom': 6,
	'maxzoom': 13
});

});

// Popup LSOA ID
// Create a popup, but don't add it to the map yet.
var centpopup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});
 
map.on('mouseenter', 'centroids', function (e) {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
 
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.code;

// Populate the popup and set its coordinates
// based on the feature found.
centpopup.setLngLat(coordinates).setHTML(description).addTo(map);
});
 
map.on('mouseleave', 'centroids', function () {
map.getCanvas().style.cursor = '';
centpopup.remove();
});


// Click on Transit transitstops
map.on('click', 'transitstops', function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var stop_name = e.features[0].properties.stop_name;
var stop_grade = e.features[0].properties.grade;
var stops_per_week = e.features[0].properties.stops_per_week;
var stop_id = e.features[0].properties.stop_id;
var stops_total = e.features[0].properties.stops_total;

var description = '<p><b>' + stop_name + '</b></p>' +
'<p> Stop id: ' + stop_id + '</p>' +
'<p> Frequency Grade: ' + stop_grade + '</p>' +
'<p> Stops per week: ' + stops_per_week + '</p>' +
'<p> Stops total: ' + stops_total + '</p>';
 
new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});
 
// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'transitstops', function () {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'transitstops', function () {
map.getCanvas().style.cursor = '';
});

// Show Isochrones
map.on('click', 'centroids', function (e) {
  var lsoacode = e.features[0].properties.code;
  var lsoaurl = 'https://www.carbon.place/data/isochrones/' + lsoacode + '.geojson';
  
  if (map.getLayer('isochrones')){
    console.log("removed layer");
    map.removeLayer('isochrones');
    
  }
  
  if(map.getSource('isochrones')){
    console.log("removed source");
    map.removeSource('isochrones');
  }
  
  map.addSource('isochrones', {
    type: 'geojson',
    data: lsoaurl
  });
  console.log("add source");
  
  map.on('sourcedata', function(e) {
  if (e.isSourceLoaded) {
  // Do something when the source has finished loading
  if (map.getLayer('isochrones')){
    //console.log("removed layer");
    map.removeLayer('isochrones');
   
  } 
  map.addLayer(
          {
          'id': 'isochrones',
          'type': 'fill',
          'source': 'isochrones',
          "paint": {
                  "fill-color": [
          			'match',
          			['get', 'mode'],
          			'WALK','#4daf4a',
          			'BIKE','#377eb8',
          			'TRANSIT','#984ea3',
          			'BIKETRANSIT','#e41a1c',
          			/* other */ '#e0e0e0'
          			],
                  "fill-opacity": 0.9,
                  'fill-outline-color': 'rgba(0, 0, 0, 0.9)'
                }
          },  'waterlines' /*'landcover_grass'*/
          );
  }
  });

});

// Setup other part of the website
showrighbox(true); // Show the accordion hide the button 
showlegend(true); // Show the legend hide the button 


