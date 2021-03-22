var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


/* Show and hid UI */
function showrighbox(show){
    var box = document.getElementById("rightbox");
    var boxbutton = document.getElementById("showrightbox");
    if(show){
      box.style.display = "block";
      boxbutton.style.display = "none";
    } else {
      box.style.display = "none";
      boxbutton.style.display = "block"; 
    }
}
    
function showlegend(show){
    var box = document.getElementById("legend");
    var boxbutton = document.getElementById("showlegend");
    if(show){
      box.style.display = "block";
      boxbutton.style.display = "none";
    } else {
      box.style.display = "none";
      boxbutton.style.display = "block"; 
    }
}

function expandtopnav() {
  var x = document.getElementById("topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
} 