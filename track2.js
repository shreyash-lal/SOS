document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = '82442ff449a44f6ca13f2b5f419c73e7'; //Api key apikey.txt wale me hai
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const location = data.results[0].formatted;
            document.getElementById('currentLocation').value = location;
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            alert('Error fetching location.');
        });
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