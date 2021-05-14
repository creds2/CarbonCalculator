// Setup Map
mapboxgl.accessToken = "NotNeeded";
var map = new mapboxgl.Map({
container: 'map',
style: 'tiles/oszoom/style_light.json' ,
center: [-0.151, 51.482],
zoom: 7,
maxZoom: 13,
minZoom: 5
});

const createButton = (text, onclick) => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
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
const mapboxglLatLngControl = {
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
        //map.on('moveend', updateLatLon);
        //updateLatLon();
        return seachbox;
    },
    getDefaultPosition: () => {
        return 'top-left'
    },
    onRemove: () => {
        map.off('moveend', updateLatLon);
    }
};
map.addControl(mapboxglLatLngControl);


// Setup other part of the website
showrighbox(true); // Show the accordion hide the button 
showlegend(true); // Show the legend hide the button 

// Highlight variable
//var hoveredStateId = null;

 
map.on('load', function() {
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

// Add Geocoder
/*
var geocodeNominatimRequest = function(query, mapBounds, options) {
	var params = { format: "json", q: query, limit: options.limit };
	var urlParams = new URLSearchParams(Object.entries(params));

	return fetch("http://nominatim.openstreetmap.org/search?" + urlParams).then(function(response) {
		if(response.ok) {
			return response.json();
		} else {
			return [];
		}
	}).then(function(json) {
		return json.map(function(result) {
			return {
				name: result.display_name,
				lat: result.lat,
				lon: result.lon,
				bbox: [result.boundingbox[2], result.boundingbox[0], result.boundingbox[3], result.boundingbox[1]]
			};
		});
	});
};

map.addControl(new MapboxGenericGeocoder({}, geocodeNominatimRequest));
*/

toggleLayer('carbon');
toggleLayer('la');
toggleLayer('transitstops');
toggleLayer('centroids');

// Highlight LSOA on mouse over
    
//map.on('mousemove', 'carbon', function (e) {
//  if (e.features.length > 0) {
//  if (hoveredStateId) {
//  map.setFeatureState(
//  { source: 'carbon', id: hoveredStateId },
//  { hover: false }
//  );
//  }
//  hoveredStateId = e.features[0].id;
//  console.log(hoveredStateId);
//  map.setFeatureState(
//  { source: 'carbon', id: hoveredStateId },
//  { hover: true }
//  );
//  }
//});


//map.on('mouseleave', 'carbon', function () {
//  if (hoveredStateId) {
//  map.setFeatureState(
//  { source: 'carbon', id: hoveredStateId },
//  { hover: false }
//  );
//  }
//  hoveredStateId = null;
//});

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
 
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
//while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//}

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

// On click open modal
map.on('click', 'carbon', function(e) {
  
  // Block Modal when clicking on other layers
  let f = map.queryRenderedFeatures(e.point);
  f = f.filter(function (el) {
    return el.source != 'composite';
  });
  
  //console.log(f);
  //console.log(f.length);
  
  if (f.length == 1) {
    
    modal.style.display = "block";
	
    var sub = e.features[0].properties;
  	var la = ladata.find(obj => {
      return obj.LAD17NM === sub.LAD17NM;
    });
  	
  	var england = ladata.find(obj => {
      return obj.LAD17NM === "England";
    });
    
    var oac = oacdata.find(obj => {
      return obj.SOAC11NM === sub.SOAC11NM;
    });
  	
  	var lsoadataurl = 'data/lsoa/' + sub.LSOA11 + '.json';
    var lsoadata;
    $.getJSON(lsoadataurl, function (json) {
        console.log( "downloaded LSOA json" );
        lsoadata = json[0];
    })
      .done(function() {
        //Hide Spinner
        $('#loader').hide();
        // Define Charts
  		  makeChartsOverview(lsoadata,la, england, oac);
  		  makeChartsEPC(lsoadata);
  	    makeChartsTransport(lsoadata, la, england);
  	    makeChartsHousing(lsoadata, la, england);
  	    switchPenPortSub(sub.SOAC11NM);
  	    switchPenPortSup(sub.SOAC11NM);
  	    makeChartsPopulation(lsoadata);
      })
      .fail(function() {
        alert("Failed to get data for this LSOA, please try refreshing the page");
      });
    
    //return;
  } 
	
});


// Modal Tabs
document.getElementById("defaultOpen").click();

function openCity(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}


// Data Warning Box
function showwarnbox(lsoaID){
  
  var badlsoa = ['E01033484','E01013536','E01032868','E01014484','E01014868','E01015551','E01015503','E01015686','E01016190','E01016281','E01016474','E01016508','E01016793','E01016767','E01016763','E01016823','E01017053','E01017054','E01031931','E01017478','E01017466','E01018138','E01019574','E01019579','E01019677','E01019970','E01021473','E01032933','E01023142','E01023866','E01027131','E01027719','E01028506','E01028456','E01028473','E01031207','E01033248','E01032403','E01004948','E01004951','E01007640','E01009320','E01010109','E01010108','E01010151','E01011457','E01011325','E01011363','E01011734','E01002520','E01028521','E01025690','E01026860','E01013378','E01006747','E01033221','E01011678','E01005210','E01033233','E01009635','E01033634','E01009642','E01017986','E01008407','E01013816','E01017958','E01006513','E01009641','E01033197','E01006512','E01017034','E01017032','E01005062','E01033583','E01013973','E01033553','E01008406','E01033006','E01011229','E01005209','E01016899','E01033005','E01032797','E01008397','E01008068','E01005284','E01005231','E01033554','E01025105','E01033762','E01033561','E01011670','E01017140','E01033724','E01026133','E01009284','E01013648','E01033556','E01019556',
  'E01013973','E01016370','E01033500','E01031998','E01017958','E01021736',
  'E01026860','E01029576','E01033749','E01007862','E01033561','E01010257','E01003016'];
  
  if(badlsoa.includes(lsoaID)){
    document.getElementById("datawarning").innerHTML = `<p><b>Warning</b>: This LSOA has been identifed by the PBCC team as having data issue <a href="datawarnings.html">click here for details</a></p>`;
  } else {
    document.getElementById("datawarning").innerHTML = ``;
  }
  
}



