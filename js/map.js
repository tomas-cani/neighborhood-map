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
  toggleBounce(marker);
  setTimeout(() => { toggleBounce(marker) }, 750);

  Promise.all([getRating(place), getAddress(place)])
  .then(() => {
    const contentString = `
      <div>
        <h3>${marker.title}</h3>
        <p>Rating: ${place.rating}</p>
        <p>Address: ${place.address}</p>
        <p class="attribution">Powered by Foursquare</p>
      </div>
    `;
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

function getRating(place) {
  const placeInfo = place.rating && !place.rating.includes('class="error"') ?
    Promise.resolve({rating: place.rating}) :
    getPlaceInfo(place.venueId);

  return placeInfo
  .then((placeInfo) => {
    const rating = String(placeInfo.rating) || '-';
    place.rating = rating;
  })
  .catch((error) => {
    place.rating = '<span class="error">Couldn\'t get rating</span>'
  })
}

function getAddress(place) {
  const addressInfo = place.address && !place.address.includes('class="error"') ?
    Promise.resolve({results: [{ formatted_address: place.address }]}) :
    getReverseGeocode(place.position);

  return addressInfo
  .then((geocodeInfo) => {
    const address = geocodeInfo.results[0].formatted_address || '-';
    place.address = address;
  })
  .catch((error) => {
    place.address = '<span class="error">Couldn\'t get address</span>'
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
