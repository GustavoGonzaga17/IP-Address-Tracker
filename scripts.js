const searchField = document.querySelector('#search')
const searchBtn = document.querySelector(".sectionSearch__searchBtn")
const ip = document.querySelector("#ipValue")
const locationValue = document.querySelector("#locationValue")
const timezoneValue = document.querySelector("#timezoneValue")
const ispValue = document.querySelector('#ispValue')
//---------------- CONFIGURANDO O MAPA ----------------
let map;
let marker;

//---------------- FIM DA CONFIGURAÇÃO DO MAPA ----------------

function initializeMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 5,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        marker = L.marker([lat, lon]).addTo(map);
    } else {
        map.setView([lat, lon], 10);
        marker.setLatLng([lat, lon]);
    }
}
initializeMap(-22.98397165178341, -43.503907038337665);

searchBtn.addEventListener('click', () => {
    searchValue = searchField.value
    search(searchValue)
})

function search(searchValue) {
    console.log(searchValue)
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_DpnAezzRwX5GFLYeT2IPicL7sw5ji&${validateValue(searchValue)}`)
        .then(response => response.json())
        .then(data => {
            changeElements(data)
            getCoordinates(data.location.region)
            console.log(data)
        })
}

function changeElements(data) {
    ip.textContent = data.ip
    locationValue.textContent = data.location.region
    timezoneValue.textContent = `UTC ${data.location.timezone}`
    ispValue.textContent = data.isp
}

function getCoordinates(address) {
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                console.log(data);
                const coordinates = {
                    lat: data[0].lat,
                    lon: data[0].lon
                };

                initializeMap(coordinates.lat, coordinates.lon);
                marker.setLatLng([coordinates.lat, coordinates.lon]);

            }
            else {
                reject(alert("Localização não encontrada"))
            }
        })
        .catch(error => {
            console.error(`Erro: ${error}`)
        })
        .finally(() => {
            console.log("Operação Finalizada")
        })
}

function initializeMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        marker = L.marker([lat, lon]).addTo(map);
    } else {
        map.setView([lat, lon], 10);
        marker.setLatLng([lat, lon]);
    }
}

function validateValue(searchValue) {
    searchValueArr = searchValue.toString().split("")
    console.log(searchValueArr)
    for (let i = 0; i < searchValueArr.length; i++) {
        if (Number(searchValueArr[0])) {
            return `ipAddress=${searchValue}`
        } else {
            return `domain=${searchValue}`
        }
    }
}