const clientSecret = 'IHODP2VY0JZIJAF4SC3LVROXEIYLTAJVCROMSLPNOC145F52';
const clientId = '3YO3MUCIIJO2WUKRP2JUFQFGD42I5SWXEEA2HOCH3NPNFA0C';

// Gets the place information from Foursquare API
function getPlaceInfo(placeId) {
  return fetch(`https://api.foursquare.com/v2/venues/${placeId}?v=20170101&client_secret=${clientSecret}&client_id=${clientId}`)
  .then((res) => res.json())
  .then((json) => json.response.venue);
}
