const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.ipbase.com/v2/info', true);
xhr.setRequestHeader('apikey', 'zZLAadVVbTPIcB5OyxPHNomJw5gv7a8fGgCxYCFU');

xhr.onload = function() {
    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        ipAddress = response.data.ip
        getGeoLocation(ipAddress)
    } else {
        console.error('Request failed with status:', xhr.status);
    }
};

xhr.onerror = function() {
    console.error('Request failed');
};

xhr.send();

function getGeoLocation(ipAddress) {
    const accessKey = '051shr6kh7im6znm';
    fetch('https://api.ipregistry.co/' + ipAddress + '?key=' + accessKey)
        .then(response => response.json())
        .then(data => {
            latitude = data['location']['latitude'];
            longitude = data['location']['longitude'];
            arrangeCards(latitude,longitude);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function arrangeCards(latitude,longitude) {
    // Locations
    distances = []

    container = document.getElementById('location-list');
    if (container) {
        cards = container.querySelectorAll('[location-longitude]')
        cards.forEach(card => {
            distance = calculateDistance(latitude, longitude, card.attributes['location-latitude'].value, card.attributes['location-longitude'].value);
            distances.push([distance, card]);
        })

        sortedArray = distances.sort(function(a, b) { return a[0] - b[0]; });

        divs = [];
        sortedArray.forEach(sorted => divs.push(sorted[1]))



        divs.forEach(div => {
            container.appendChild(div);
        });
    }

    // Multiple Locations
    document.querySelectorAll('[location-list]').forEach(container => {
        distances = []

        container.querySelectorAll('[location-longitude]').forEach(card => {
            distance = calculateDistance(latitude, longitude, card.attributes['location-latitude'].value, card.attributes['location-longitude'].value);
            distances.push([distance, card]);
        })

        sortedArray = distances.sort(function(a, b) { return a[0] - b[0]; });

        divs = [];
        sortedArray.forEach(sorted => divs.push(sorted[1]))

        divs.forEach(div => {
            container.appendChild(div);
        });
    })

    // Doctors
    distances = []

    container = document.getElementById('doctor-list');
    if(container) {
        cards = container.querySelectorAll('[doctor-longitude-1]')
        cards.forEach(card => {
            if(card.attributes['doctor-latitude-1'].value  > 0) {

                distance = calculateDistance(latitude, longitude, card.attributes['doctor-latitude-1'].value, card.attributes['doctor-longitude-1'].value);
                distances.push([distance, card]);
            }
        })

        cards = container.querySelectorAll('[doctor-longitude-2]')
        cards.forEach(card => {
            if(card.attributes['doctor-latitude-2'].value  > 0) {
                distance = calculateDistance(latitude, longitude, card.attributes['doctor-latitude-2'].value, card.attributes['doctor-longitude-2'].value);
                distances.push([distance, card]);

            }
        })

        cards = container.querySelectorAll('[doctor-longitude-3]')
        cards.forEach(card => {
            if(card.attributes['doctor-latitude-3'].value  > 0) {
                distance = calculateDistance(latitude, longitude, card.attributes['doctor-latitude-3'].value, card.attributes['doctor-longitude-3'].value);
                distances.push([distance, card]);
            }
        })

        sortedArray = distances.sort(function(a, b) { return a[0] - b[0]; });

        divs = [];
        sortedArray.forEach(sorted => {
            if (!divs.includes(sorted[1])) {
                divs.push(sorted[1])
            }
        })

        divs.forEach(div => {
            container.appendChild(div);
        });
    }

    sliders = document.querySelectorAll('[data-slider]')
    sliders.forEach(slider => slider.scrollLeft = 0)
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}