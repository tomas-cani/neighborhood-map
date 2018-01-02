
const key = 'AIzaSyCFeY2sL1zpzrl2rA8wU9gNMgMESCkix1U';

// Gets the place information from Foursquare API
function getAddress(position) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${key}`)
  .then((res) => res.json());
}
