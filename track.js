let map;
let marker;
let watchId;

document.getElementById('trackButton').addEventListener('click', function() {
    document.getElementById('map').style.display = 'block';
    initMap();
});

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const userLocation = [latitude, longitude];

            map = L.map('map').setView(userLocation, 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            marker = L.marker(userLocation).addTo(map)
                .bindPopup('Your Location')
                .openPopup();

            startMonitoring();
        }, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function startMonitoring() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(position => {
            const { latitude, longitude } = position.coords;
            const userLocation = [latitude, longitude];

            marker.setLatLng(userLocation);
            map.setView(userLocation);

            document.getElementById('realTimeLocation').value = `Lat: ${latitude}, Lng: ${longitude}`;
        }, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}