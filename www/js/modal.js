// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
	modal.style.display = "none";
  }
};


// How map triggers the modal 
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

