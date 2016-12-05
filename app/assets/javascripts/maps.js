// function getPos(){
//   // console.log("getPos() called from initMap()");
//   return navigator.geolocation.getCurrentPosition(myPos);
// }
//
// function myPos(position){
//   // console.log("position");
//   // console.log(position);
//   // lat =  position.coords.latitude);
//   // long= position.coords.longitude);
//
// }


function mapNew(position){

  var pos = {
    lat:position.coords.latitude,
    long:position.coords.longitude
  }


  var map = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: pos.lat,
              lng: pos.long
          },
          zoom: 12,
          mapTypeId: 'roadmap'
      });

    // getPost();

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);


      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());


      });


      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();


          if (places.length == 0) {
              return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
              marker.setMap(null);
          });

          markers = [];


          var icon = {
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
          };
          var bounds = new google.maps.LatLngBounds();

          // For each place, get the icon, name and location.
          places.forEach(function(place) {
              if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
              }
              if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
              } else {
                  bounds.extend(place.geometry.location);
              }

              // Create a marker for each place.
              var marker = new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  animation: google.maps.Animation.DROP,
                  position: place.geometry.location
              });



              // Set the content for each marker
              var contentString = '<span style="font-weight:900;font-size:18px;">' +
                  place.name +
                  '</span><br/>' +
                  place.formatted_address +
                  '<br/><a href="/" id="bar-btn" class="waves-effect waves-light btn" style="margin-top:5px;">Add Location</a>';

              var infowindow = new google.maps.InfoWindow();



              marker.addListener('click', function() {
                  map.setZoom(16);
                  map.setCenter(marker.getPosition());
                });

              map.addListener('click', function() {
                infowindow.close();
              });


              marker.addListener('click', function() {
                infowindow.setContent(contentString);
                  infowindow.open(map, this);
                  // $('canvas').on("click", function(){
                  //   console.log('marker clicked')
                  // });

              })

              infowindow.addListener('mouseout', function() {
                infowindow.close();
              })

              marker.addListener('click', function() {
                // Disable the 'Add Location' button on markers
                document.getElementById('bar-btn').addEventListener( 'click', function(event) {
                    event.preventDefault();
                    $.ajax({
                      type: "POST",
                      url: "/bars",
                      data: { name: place.name, place_id: place.place_id, address: place.formatted_address },
                      success: function() {
                        $('#bar-btn').html('Successfully Added!');
                      },
                      error: function() {
                        $('#bar-btn').html('Bar Already Exists!');
                      }
                    });
                  });
              });



              markers.push(marker);

          });
          map.fitBounds(bounds);
      });




}

function initMap() {
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(mapNew);
}
}
