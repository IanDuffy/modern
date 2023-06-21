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
  // Check if the map is expanded
  var isExpanded = locationsWrapper.classList.contains('is--expanded');

  if (Array.isArray(doctorCoordinates) && doctorCoordinates.length > 0) {
    if (!Array.isArray(doctorCoordinates[0]) || 2 !== doctorCoordinates[0].length || isNaN(doctorCoordinates[0][0]) || isNaN(doctorCoordinates[0][1])) {
      console.error('Invalid coordinate:', doctorCoordinates[0]);
    } else if (1 === doctorCoordinates.length) {
      map.setCenter(doctorCoordinates[0]);
      map.setZoom(18);
    } else if (isExpanded) { // Only call fitBounds if the map is expanded
      const bounds = new mapboxgl.LngLatBounds(doctorCoordinates[0], doctorCoordinates[0]);
      doctorCoordinates.forEach(coord => {
        if (Array.isArray(coord) && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1])) {
          bounds.extend(coord);
        }
      });
      map.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: window.innerWidth / 3, right: 50 }, maxZoom: 12 });
    }
  } else {
    console.error('Invalid doctorCoordinates:', doctorCoordinates);
  }
}


function setMarkerOpacity(doctorName) {
  document.querySelectorAll(".marker").forEach((marker) => {
    marker.classList.remove("marker-selected");

    // If a doctor is selected, add the marker-selected class to all markers for that doctor
    if (doctorName !== "" && marker.dataset.message.startsWith(doctorName)) {
      marker.classList.add("marker-selected");
    }
  });
}

function showLocationCards(doctorName, selectedLocation) {
  document.querySelectorAll(".location--card-item").forEach((card) => {
    card.style.display = "none";

    // If a doctor is selected, show all location cards for that doctor
    if (doctorName !== "" && card.dataset.message.startsWith(doctorName)) {
      card.style.display = "block";
    }

    // If a specific location is selected, show the location card for that location
    if (selectedLocation && card.dataset.message === selectedLocation) {
      card.style.display = "block";
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
  setMarkerOpacity(selectedDoctor);
  // Show the location cards for the selected doctor
  showLocationCards(selectedDoctor, firstDoctorLocationCard ? firstDoctorLocationCard.dataset.message : '');
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