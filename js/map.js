var map;
var infowindow;

// Initializes the google map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat:-34.920495, lng:-57.953566},
    styles: googleMapStyle,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow({
    content: ''
  });
}

// Creates a google maps Marker
function createMarker(place) {
  return new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    icon: `./images/${place.type}.png`,
    map: map,
    position: place.position,
    title: place.name,
    lsls: 1
  });
}

// Shows an google maps InfoWindow over the marker of the selected place
function showPlaceInfo(place, marker) {
  const placeInfo = place.rating ? Promise.resolve({rating: place.rating}) : getPlaceInfo(place.venueId);
  toggleBounce(marker);
  setTimeout(() => { toggleBounce(marker) }, 750);
  placeInfo
  .then((placeInfo) => placeInfo.rating )
  .catch((error) => '<span class="error">Couldn\'t get rating</span>')
  .then((rating) => {
    rating = rating || '-';
    place.rating = rating;
    const contentString = `
      <div>
        <h3>${marker.title}</h3>
        <p>Rating: ${rating}</p>
        <p class="attribution">Powered by Foursquare</p>
      </div>
    `;
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

// https://developers.google.com/maps/documentation/javascript/examples/marker-animations
function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
