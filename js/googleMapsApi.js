const key = 'AIzaSyCFeY2sL1zpzrl2rA8wU9gNMgMESCkix1U';

// Gets the address information from Google Maps API
function getReverseGeocode(position) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${key}`)
  .then((res) => res.json());
}

function googleError() {
  document.getElementById('map').innerHTML = '<p class ="error">An error has ocurred</p>';
}
