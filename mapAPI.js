var map;
var curLoc;
var view;

function init() {
  curLoc = ol.proj.fromLonLat([-87.641660, 41.882590]);

  view = new ol.View({
    center: curLoc,
    zoom: 6
  });

  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
    })
  ],

    loadTilesWhileAnimating: true,
    view: view
  });
}

function panHome(){
  view.animate({
    center: curLoc,
    duration: 2000
  });

}

function makeRequest(){
  var locationName = document.getElementById("country-name").value;

  var query = "https://restcountries.eu/rest/v2/name/" + locationName;

  locRequest = new XMLHttpRequest();



  locRequest.open('GET', query, true);
  locRequest.onload = processlocRequest

  locRequest.send();
}




function processlocRequest(){
  if(locRequest.readyState != 4){
    return;
  }
   if(locRequest.status != 200 || locRequest.responseText ===""){
    window.console.error("Request had an error")
    return;
  }


  var locInfo = JSON.parse(locRequest.responseText);
  var newlon = locInfo[0].latlng[1]
  var newlat = locInfo[0].latlng[0]

  window.console.log(locInfo + ":Long: "+newlon+" Lat:" +newlat)

  var newlocation = ol.proj.fromLonLat([newlon, newlat]);

  view.animate({
    center: newlocation,
    duration: 2000
  });

}












window.onload = init;
