var centerLat = -81.73120110017412;
var centerLong = 28.29675612318229;
var latitude = centerLat;
var longitude = centerLong;
var zoom = 7;
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

        accessToken: mapboxgl.accessToken, 
        mapboxgl: mapboxgl, 
        marker: false, 
        placeholder: 'Search for address', 
        bbox: [], 
        proximity: {
          longitude: long,
          latitude: lat
        } 
      });

      mapObject.addControl(geocoder);

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

        geocoder.on('result', (event) => {
          mapObject.getSource('single-point').setData(event.result.geometry);
        });
      });

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

        map.flyTo({ center: marker.geometry.coordinates, zoom: zoom });

        const correspondingFilterChip = Array.from(document.querySelectorAll('.filter-chip'))
          .find(chip => chip.textContent.trim() === marker.properties.message);

        document.querySelectorAll('.filter-chip').forEach(chip => {
          chip.classList.remove('active');
          chip.parentNode.classList.remove('fs-cmsfilter_active');
        });

        if (correspondingFilterChip) {
          correspondingFilterChip.classList.add('active');
          correspondingFilterChip.parentNode.classList.add('fs-cmsfilter_active');

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

    marker.classList.remove('marker-selected');

    if (selectedLocation !== '' && marker.dataset.message.startsWith(selectedLocation)) {
      if (marker.dataset.message === selectedMarkerMessage) {
        marker.classList.add('marker-selected');
      }
    } else if (selectedMarker && marker === selectedMarker) {

      marker.classList.add('marker-selected');
    } else if (selectedMarkerMessage && marker.dataset.message === selectedMarkerMessage) {

      marker.classList.add('marker-selected');
    }
  });
}

function onFilterChipClick(event) {
  const selectedLocation = event.currentTarget.textContent.trim();
  const isActive = event.currentTarget.classList.contains('active');

  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
  if (!isActive) {
    event.currentTarget.classList.add('active');
  }

  locationArr = ogLocations.filter(location => location.properties.message.includes(selectedLocation));

  if (locationArr.length > 0) {

    const locationCoordinates = locationArr[0].geometry.coordinates;

    map.flyTo({ center: locationCoordinates, zoom: 14 });

    const locationCard = Array.from(document.querySelectorAll('[data-text="location"]'))
      .find(el => el.textContent.includes(locationArr[0].properties.message))
      .closest('.location--card-item');

    document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');

    if (locationCard) {
      locationCard.style.display = 'block';
    }

    const selectedMarkerMessage = locationCard
      ? locationCard.querySelector('[data-text="location"]').textContent
      : '';
    if (isActive) {
      setMarkerOpacity('', selectedMarkerMessage);
    } else {
      setMarkerOpacity(selectedLocation, selectedMarkerMessage);
    }

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

    locationArr = ogLocations;
    map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
  }
}

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', onFilterChipClick);
});

document.addEventListener('DOMContentLoaded', () => {
  var expandMapBtn = document.getElementById("expandMap");
  var locationsWrapper = document.querySelector(".locations_card-grid-wrapper");
  const mapboxglMarkers = document.querySelectorAll('.mapboxgl-marker');

  expandMapBtn.addEventListener("click", function() {
    locationsWrapper.classList.toggle("is--expanded");

    const geocoderControl = document.querySelector('.mapboxgl-ctrl-geocoder');
    geocoderControl.style.display = locationsWrapper.classList.contains("is--expanded") ? 'block' : 'none';

    if (locationsWrapper.classList.contains("is--expanded")) {
      expandMapBtn.innerHTML = "Minimize";
    } else {
      expandMapBtn.innerHTML = "Show Map";
    }

    setTimeout(() => {
      map.resize();

      const activeFilterChip = Array.from(document.querySelectorAll('.filter-chip')).find(chip => chip.classList.contains('active'));
      if (activeFilterChip) {

        const selectedLocation = activeFilterChip.textContent.trim();
        const selectedLocationData = locationArr.find(x => x && x.properties && x.properties.message.includes(selectedLocation));

        if (selectedLocationData && selectedLocationData.geometry) {
          map.flyTo({ center: selectedLocationData.geometry.coordinates, zoom: 14 });
        }
      } else {

        map.flyTo({ center: [centerLat, centerLong], zoom: 9 });
      }
    }, 200); 
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

  document.querySelectorAll('.location--card-item').forEach(card => card.style.display = 'none');
  setMarkerOpacity('', '');
});