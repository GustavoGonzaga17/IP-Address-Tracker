const searchField = document.querySelector('#search')
const searchBtn = document.querySelector(".sectionSearch__searchBtn")
const ip = document.querySelector("#ipValue")
const locationValue = document.querySelector("#locationValue")
const timezoneValue = document.querySelector("#timezoneValue")
const ispValue = document.querySelector('#ispValue')

searchBtn.addEventListener('click', () => {
    searchValue = searchField.value
    search(searchValue)
})

function search(searchValue) {
    console.log(searchValue)
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_DpnAezzRwX5GFLYeT2IPicL7sw5ji&ipAddress=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            changeElements(data)
        })
}

function changeElements (data) {
    ip.textContent = data.ip
    locationValue.textContent = data.location.region
    timezoneValue.textContent = `UTC ${data.location.timezone}`
    ispValue.textContent = data.isp
}