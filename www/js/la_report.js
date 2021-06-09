var ladata;

function switchLALayer() {
  var layerId = document.getElementById("lainput").value;
  
	var la = ladata.find(obj => {
    return obj.LAD17NM === layerId;
  });
	
	var england = ladata.find(obj => {
    return obj.LAD17NM === "England";
  });
  
	// Define Charts
	makeChartsOverview(null,la, england, null);
	makeChartsEPC(la);
	makeChartsTransport(la, null, england);
	makeChartsHousing(la, null, england);
	makeChartsPopulation(la);
}


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


jQuery.ajaxSetup({
    beforeSend: function() {
       $('#loader').show();
    },
    success: function() {}
  });
  
  $.getJSON("/data/la_averages.json", function (json) {
    console.log( "downloaded la json" );
    ladata = json;
})
  .done(function() {
    $('#loader').hide();
    switchLALayer();
  })
  .fail(function() {
    alert("Failed to LA get JSON");
  });