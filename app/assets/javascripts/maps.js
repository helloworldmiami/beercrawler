function initMap() {
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 16,
  center: {lat: 25.8002131, lng: -80.2043848}
});
directionsDisplay.setMap(map);
}
