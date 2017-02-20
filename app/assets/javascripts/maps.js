
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
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
        var places = searchBox.getPlaces(),
        places_location = [];
        if (places.length == 0) {
            return;
        }

        markers = [];


        var icon = {
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        var bounds = new google.maps.LatLngBounds();

        // For each place, get the icon, name and location.
        places.map(function(place){
          var places = {
            place_id:place.id,
            place_name: place.name,
            place_formatted_address:place.formatted_address,
            location: {lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng()}
          }
          places_location.push(places)
        })

        var markers = places_location.map(function(place, i) {
          return new google.maps.Marker({
          position: place.location,
          label: labels[i % labels.length]
          });
        });

        markers.forEach(function(marker, i){
          var contentString = '<div class="place_info"><span style="font-weight:900;font-size:18px;">' +
                places_location[i].place_name +
                '</span><br/>' +
                places_location[i].place_formatted_address +
                '<br/><a href="/" id="bar-btn" class="waves-effect waves-light btn" style="margin-top:5px;">Add Location</a> </div>';
          var infowindow = new google.maps.InfoWindow();

          marker.addListener('click', function() {
            map.setZoom(16);
          });

          marker.addListener('click', function() {
            infowindow.setContent(contentString);
              infowindow.open(map, this);
          })

          infowindow.addListener('mouseout', function() {
              infowindow.close();
            })

          marker.addListener('click', function() {
            // Disable the 'Add Location' button on markers
            document.getElementById('bar-btn').addEventListener( 'click', function(event) {
              // console.log("route_id: ", $('#route_id').data('routeid')));
              event.preventDefault();
                $.ajax({
                  type: "POST",
                  url: "/bars",
                  data: { name: places_location[i].name, place_id: places_location[i].place_id, address: places_location[i].formatted_address, route_id: parseInt($('#route_id').data('routeid'))},
                  success: function(data) {
                    $('#bar-btn').html('Successfully Added!');
                    data.bar_id
                  },
                  error: function() {
                    $('#bar-btn').html('Bar Already Exists!');
                  }
                });
              });
            });
        map.addListener('click', function() {
          infowindow.close();
          });
        })
        var markerCluster = new MarkerClusterer(map, markers,
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        });
}

function initMap() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(mapNew);
  }
}
