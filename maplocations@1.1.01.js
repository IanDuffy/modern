var centerLat = -81.73120110017412;
var centerLong = 28.29675612318229;
var latitude = centerLat;
var longitude = centerLong;
var zoom = 7;
var cardTopElement = document.getElementById('cardTop');
var locationsWrapper = document.querySelector(".locations_card-grid-wrapper");
let ogAdd = document.querySelector('[data-text="address"]');
let selectedAddress = '';
let ogLocations = locationArr;
let map;
function initMap(lat, long, zoom, mapObject, selectedDoctor = '') {
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
      }
      setMarkerOpacity(selectedDoctor, marker.properties.message, el);
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

var doctors = [];
doctorLocations.forEach(function (e) {
  var matchingItems = doctors.filter(function (item) {
    return item['doctor name'] === e['doctor name'];
  });
  if (matchingItems.length === 0) {
    doctors.push(e);
  }
});

function zoomToDoctorLocations(map, doctorCoordinates) {
  console.log(doctorCoordinates); // Add this line
  const bounds = new mapboxgl.LngLatBounds();
  if (doctorCoordinates.length === 1) {
    map.setCenter(doctorCoordinates[0]);
    map.setZoom(18);
  } else {
    doctorCoordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: window.innerWidth / 3, right: 50 }, maxZoom: 12 });
  }
}

function setMarkerOpacity(selectedDoctor, selectedMarkerMessage, selectedMarker = null) {
  const markers = document.querySelectorAll('.marker');
  markers.forEach((marker) => {
    // Always remove the marker-selected class
    marker.classList.remove('marker-selected');

    if (selectedDoctor !== '' && marker.dataset.message.startsWith(selectedDoctor)) {
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
  const selectedDoctor = event.currentTarget.textContent.trim();
  const isActive = event.currentTarget.classList.contains('active');

  // Toggle the 'active' class on the filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
  if (!isActive) {
    event.currentTarget.classList.add('active');
  }

  if (selectedDoctor) {
    latitude = centerLat;
    longitude = centerLong;
    zoom = 8;

    var doctorFilteredLocation = [];
    doctorLocations.filter(x => x['doctor name'].includes(selectedDoctor)).forEach(function (x) {
      doctorFilteredLocation.push(ogLocations.filter(y => y.properties.message.includes(x.location))[0]);
    });
    locationArr = doctorFilteredLocation;
  } else {
    latitude = centerLat;
    longitude = centerLong;
    zoom = 8;
    locationArr = ogLocations;
  }
  initMap(latitude, longitude, zoom, map, selectedDoctor); // Pass the map object

  // Zoom in and set bounds around the doctor's location(s)
  const doctorCoordinates = locationArr.map(location => location.geometry.coordinates);
  if (doctorCoordinates.length > 0) {
    zoomToDoctorLocations(map, doctorCoordinates);
  }

  // Find the first matching location card for the selected doctor
  const firstDoctorLocationCard = locationArr.length > 0 ? Array.from(document.querySelectorAll('[data-text="location"]'))
    .find(el => el.textContent.includes(locationArr[0].properties.message))
    .closest('.location--card-item') : null;

  // Hide all location cards
  document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');

  // Show the first location card of the selected doctor
  if (firstDoctorLocationCard) {
    firstDoctorLocationCard.style.display = 'block';
    // Check if the locationsWrapper element does not contain the .is--expanded class
    if (!locationsWrapper.classList.contains("is--expanded")) {
      cardTopElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Set the opacity of the markers based on the selected doctor
  const selectedMarkerMessage = firstDoctorLocationCard
    ? firstDoctorLocationCard.querySelector('[data-text="location"]').textContent
    : '';
  if (isActive) {
    setMarkerOpacity('', selectedMarkerMessage);
  } else {
    setMarkerOpacity(selectedDoctor, selectedMarkerMessage); // Use selectedDoctor instead of markerDoctor
  }

  // Update the selected marker
  const firstDoctorLocationMessage = firstDoctorLocationCard
    ? firstDoctorLocationCard.querySelector('[data-text="location"]').textContent
    : '';
  if (firstDoctorLocationMessage) {
    const firstDoctorMarker = Array.from(document.querySelectorAll('.marker')).find(
      (marker) => marker.dataset.message === firstDoctorLocationMessage
    );
    if (firstDoctorMarker) {
      setMarkerOpacity(selectedDoctor, firstDoctorLocationMessage, firstDoctorMarker);
    }
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
    if (locationsWrapper.classList.contains("is--expanded")) {
      expandMapBtn.innerHTML = "Minimize";
    } else {
      expandMapBtn.innerHTML = "Show Map";
    }
    map.resize();
    map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
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
  }
  mapboxglMarkers.forEach((marker) => {
    marker.addEventListener('click', onMarkerClick);
  });
  const resetZoomBtn = document.getElementById("resetZoomBtn");
  resetZoomBtn.addEventListener('click', () => {
    map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
  });
});

document.querySelector('.mapboxgl-canvas').addEventListener('click', () => {
  // Hide all location cards
  document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');
  setMarkerOpacity('', '');
});
