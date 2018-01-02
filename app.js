function LocationsViewModel() {
  var self = this;

  // Creates all the google maps Marker for all places
  self.createMarkers = (map, places) => {
    const markers = [];
    places.forEach((place) => {
      const min = 1000;
      const max = 1500;
      setTimeout(() => {
        const newMarker = createMarker(place);
        newMarker.addListener('click', () => {
          self.selectedPlace(place);
          showPlaceInfo(place, newMarker);
        });
        markers.push(newMarker);
      }, Math.floor(Math.random() * (max - min + 1)) + min);
    });
    return markers;
  }
  self.markers = self.createMarkers(map, places);

  self.filterText = ko.observable('');
  self.selectedPlace = ko.observable(null);

  self.filteredPlaces = ko.computed(function filterPlaces() {
    // Filter places in the result list by name
    const filteredPlaces = places.filter((place) => {
      const placeName = place.name.toLowerCase();
      return placeName.includes(self.filterText().toLowerCase());
    });

    // Just show the filtered markers in map
    self.markers.forEach((marker) => {
      const isFiltered = filteredPlaces.find((filteredPlace) => filteredPlace.name == marker.getTitle());
      if (isFiltered) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    });

    return filteredPlaces;
  });

  // Selects a place in the list and open its marker in the map
  self.selectPlace = (place) => {
    self.selectedPlace(place);
    const marker = self.markers.find((marker) => marker.getTitle() == place.name);
    showPlaceInfo(place, marker);
  }

}

ko.applyBindings(new LocationsViewModel());
