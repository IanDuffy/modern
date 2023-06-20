var centerLat = -81.73120110017412;
var centerLong = 28.29675612318229;
var latitude = centerLat;
var longitude = centerLong;
var zoom = 7
var cardTopElement = document.getElementById('cardTop');
var locationsWrapper = document.querySelector(".locations_card-grid-wrapper");
let ogAdd = document.querySelector('[data-text="address"]');
let selectedAddress = '';
let ogLocations = locationArr;
let map;

function initMap(lat, long, zoom, mapObject, selectedLocation = '') {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaWR1ZmZ5IiwiYSI6ImNsZTUzZTAwZTA2cXEzd25xdDYxcTY2M3IifQ._wA9UjVFdBBYeyx30y-kVw';
  const geojson = {
    'type': 'FeatureCollection',
    'features': locationArr
  };

  if (!mapObject) {
    mapObject = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/iduffy/clhget0j8003001qs9jwj4m82',
      center: [lat, long],
      zoom: zoom
      });
    
      const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: 'Search for address', // Placeholder text for the search bar
        bbox: [], // Add a boundary if needed
        proximity: {
          longitude: long,
          latitude: lat
        } // Set the proximity to the current center of the map
      });
  
      // Add the geocoder to the map
      mapObject.addControl(geocoder);
      
      // After the map style has loaded on the page,
      // add a source layer and default styling for a single point
      mapObject.on('load', () => {
        mapObject.addSource('single-point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': []
          }
        });
  
        mapObject.addLayer({
          'id': 'point',
          'source': 'single-point',
          'type': 'circle',
          'paint': {
            'circle-radius': 10,
            'circle-color': '#005FAF'
          }
        });
      
        // Listen for the `result` event from the Geocoder
        // `result` event is triggered when a user makes a selection
        // Add a marker at the result's coordinates
        geocoder.on('result', (event) => {
          mapObject.getSource('single-point').setData(event.result.geometry);
        });
      });
  
      // Hide the geocoder by default
      const geocoderContainer = document.querySelector('.mapboxgl-ctrl-geocoder');
      geocoderContainer.classList.add('hidden-geocoder');
    } else {
      mapObject.jumpTo({ center: [lat, long], zoom: zoom });
    }
  	
  for (const marker of geojson.features) {
    const el = document.createElement('div');
    const width = marker.properties.iconSize[0];
    const height = marker.properties.iconSize[1];
    el.className = 'marker';
    el.style.width = '26px';
    el.style.height = '30px';
    el.style.backgroundSize = '100%';
    el.dataset.message = marker.properties.message;
    el.addEventListener('click', (e) => {
      document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');
    
      if (marker.properties.message) {
        const drEl = Array.from(document.querySelectorAll('[data-text="location"]'))
          .find(el => el.textContent.includes(marker.properties.message))
          .closest('.location--card-item');
        drEl.style.display = 'block';
        // Zoom in to the selected marker
        map.flyTo({ center: marker.geometry.coordinates, zoom: 14 });
    
        // Find the corresponding filter chip
        const correspondingFilterChip = Array.from(document.querySelectorAll('.filter-chip'))
          .find(chip => chip.textContent.trim() === marker.properties.message);
    
        // Remove the 'active' class from all filter chips and '.fs-cmsfilter_active' from their wrapper
        document.querySelectorAll('.filter-chip').forEach(chip => {
          chip.classList.remove('active');
          chip.parentNode.classList.remove('fs-cmsfilter_active');
        });
    
        // Add the 'active' class to the corresponding filter chip and '.fs-cmsfilter_active' to its wrapper
        if (correspondingFilterChip) {
          correspondingFilterChip.classList.add('active');
          correspondingFilterChip.parentNode.classList.add('fs-cmsfilter_active');
    
          // Find the .filter-chip-label sibling and trigger a click event on it
          const correspondingFilterChipLabel = correspondingFilterChip.nextElementSibling;
          if (correspondingFilterChipLabel && correspondingFilterChipLabel.classList.contains('filter-chip-label')) {
            correspondingFilterChipLabel.click();
          }
        }
      }
      setMarkerOpacity(selectedLocation, marker.properties.message, el);
    });
    
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(mapObject);
  }
  mapObject.on('load', () => {
    const closeCardButtons = document.querySelectorAll('.close-card-button');
    closeCardButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');
        setMarkerOpacity('', '');
        // Zoom back out when closing the card
        map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
      });
    });
  });
  return mapObject;
}

map = initMap(latitude, longitude, zoom, null, '');

function setMarkerOpacity(selectedLocation, selectedMarkerMessage, selectedMarker = null) {
  const markers = document.querySelectorAll('.marker');
  markers.forEach((marker) => {
    // Always remove the marker-selected class
    marker.classList.remove('marker-selected');

    if (selectedLocation !== '' && marker.dataset.message.startsWith(selectedLocation)) {
      if (marker.dataset.message === selectedMarkerMessage) {
        marker.classList.add('marker-selected');
      }
    } else if (selectedMarker && marker === selectedMarker) {
      // Add the marker-selected class if a selectedMarker is provided
      marker.classList.add('marker-selected');
    } else if (selectedMarkerMessage && marker.dataset.message === selectedMarkerMessage) {
      // Add the marker-selected class based on the selectedMarkerMessage
      marker.classList.add('marker-selected');
    }
  });
}

// Add this function to handle the click event on the filter chips
function onFilterChipClick(event) {
  const selectedLocation = event.currentTarget.textContent.trim();
  const isActive = event.currentTarget.classList.contains('active');

  // Toggle the 'active' class on the filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
  if (!isActive) {
    event.currentTarget.classList.add('active');
  }
  
  // Filter the locationArr for the selected location
  locationArr = ogLocations.filter(location => location.properties.message.includes(selectedLocation));

  // If a location is selected, zoom into it; otherwise, zoom out
  if (locationArr.length > 0) {
    // Find the coordinates of the first matched location
    const locationCoordinates = locationArr[0].geometry.coordinates;

    // Zoom into the selected location
    map.flyTo({ center: locationCoordinates, zoom: 14 });

    // Find the matching location card for the selected location
    const locationCard = Array.from(document.querySelectorAll('[data-text="location"]'))
      .find(el => el.textContent.includes(locationArr[0].properties.message))
      .closest('.location--card-item');

    // Hide all location cards
    document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');

    // Show the location card of the selected location
    if (locationCard) {
      locationCard.style.display = 'block';
      // Check if the locationsWrapper element does not contain the .is--expanded class
      if (!locationsWrapper.classList.contains("is--expanded")) {
        cardTopElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Set the opacity of the markers based on the selected location
    const selectedMarkerMessage = locationCard
      ? locationCard.querySelector('[data-text="location"]').textContent
      : '';
    if (isActive) {
      setMarkerOpacity('', selectedMarkerMessage);
    } else {
      setMarkerOpacity(selectedLocation, selectedMarkerMessage);
    }

    // Update the selected marker
    const locationMessage = locationCard
      ? locationCard.querySelector('[data-text="location"]').textContent
      : '';
    if (locationMessage) {
      const locationMarker = Array.from(document.querySelectorAll('.marker')).find(
        (marker) => marker.dataset.message === locationMessage
      );
      if (locationMarker) {
        setMarkerOpacity(selectedLocation, locationMessage, locationMarker);
      }
    }
  } else {
    // If no location is selected, reset the locationArr and zoom out
    locationArr = ogLocations;
    map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
  }
}



// Add event listeners to the filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', onFilterChipClick);
});


document.addEventListener('DOMContentLoaded', () => {
  var expandMapBtn = document.getElementById("expandMap");
  const mapboxglMarkers = document.querySelectorAll('.mapboxgl-marker');
  
  expandMapBtn.addEventListener("click", function() {
    locationsWrapper.classList.toggle("is--expanded");
    // Hide or show the geocoder control
    const geocoderControl = document.querySelector('.mapboxgl-ctrl-geocoder');
    geocoderControl.style.display = locationsWrapper.classList.contains("is--expanded") ? 'block' : 'none';
    
    if (locationsWrapper.classList.contains("is--expanded")) {
      expandMapBtn.innerHTML = "Minimize";
    } else {
      expandMapBtn.innerHTML = "Show Map";
    }
    
    setTimeout(() => {
      map.resize();
  
      // Check if a filter is active
      const activeFilterChip = Array.from(document.querySelectorAll('.filter-chip')).find(chip => chip.classList.contains('active'));
      if (activeFilterChip) {
        // If a filter is active, find the corresponding location
        const selectedLocation = activeFilterChip.textContent.trim();
        const selectedLocationData = locationArr.find(x => x && x.properties && x.properties.message.includes(selectedLocation));
        // If the location data exists, recenter the map to this location
        if (selectedLocationData && selectedLocationData.geometry) {
          map.flyTo({ center: selectedLocationData.geometry.coordinates, zoom: 14 });
        }
      } else {
        // If no filter is active, recenter the map to the original center
        map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
      }
    }, 200); // Wait 200 milliseconds before resizing and recentering
  });




  function resetMarkers() {
    mapboxglMarkers.forEach((marker) => {
      marker.style.zIndex = 0;
    });
  }

  function onMarkerClick(event) {
    resetMarkers();
    const marker = event.currentTarget;
    const message = marker.dataset.message;
    
    if (!locationsWrapper.classList.contains("is--expanded")) {
      locationsWrapper.classList.add("is--expanded");
      expandMapBtn.innerHTML = "Collapse";
      map.resize();
    }
    if (message) {
      const drEl = Array.from(document.querySelectorAll('[data-text="location"]'))
        .find(el => el.textContent.includes(message))
        .closest('.location--card-item');
      if (drEl) {
        drEl.style.display = 'block';
        marker.style.zIndex = 99999;
      }
    }
  
    // Find the corresponding location data for the clicked marker
    const selectedLocationData = locationArr.find(x => x && x.properties && x.properties.message === message);
  
    // If the location data exists, recenter the map to this location
    if (selectedLocationData && selectedLocationData.geometry) {
      map.flyTo({ center: selectedLocationData.geometry.coordinates, zoom: 14 });
    }
  }
  
  mapboxglMarkers.forEach((marker) => {
    marker.addEventListener('click', onMarkerClick);
  });
  const resetZoomBtn = document.getElementById("resetZoomBtn");
  resetZoomBtn.addEventListener('click', () => {
    map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
  });
});

// Apply event listener to the #filterRegion button
document.querySelector('#filterRegion').addEventListener('click', function() {
    // Select the filter wrap
    const filterWrap = document.querySelector('.filter-reveal-wrap');

    // Toggle the 'is--visible' class
    filterWrap.classList.toggle('is--visible');
});