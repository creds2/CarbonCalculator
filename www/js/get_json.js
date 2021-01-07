jQuery.ajaxSetup({
  beforeSend: function() {
     $('#loader').show();
  },
  complete: function(){
     $('#loader').hide();
  },
  success: function() {}
});


//var carbondata = [];
//$.getJSON("data/attributes_gzip.json", function (json) {
//    carbondata.push(json);
//   //carbondata = json;
//    console.log("v3");
//    console.log(carbondata[0]);
//});

var carbondata;
$.getJSON("data/attributes.json", function (json) {
    console.log( "downloaded json" );
    carbondata = json;
    console.log(carbondata[0]);
})
  .fail(function() {
    alert("Failed to get JSON");
  });


//var carbondata = $.getJSON("data/attributes.json", function() {
//  console.log( "downloaded json" );
//})
//  .fail(function() {
//    alert("Failed to get JSON");
//  });


//var getJSON = function(url, callback) {
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', url, true);
//    xhr.responseType = 'json';
//    xhr.onload = function() {
//      var status = xhr.status;
//      if (status === 200) {
//        callback(null, xhr.response);
//      } else {
//        callback(status, xhr.response);
//      }
//    };
//    xhr.send();
//};

//var carbondata = getJSON('data/attributes_gzip.json',
//function(err, data) {
//  if (err !== null) {
//    alert('Something went wrong: ' + err);
//  } else {
//    // Takes time to get so much json
//    //alert('Your query count: ' + carbondata.query.count);
//  }
//});


