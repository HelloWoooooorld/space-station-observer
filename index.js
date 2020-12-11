async function getData(url) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
// fetching data 

async function getLocation() {
  await getData('http://api.open-notify.org/iss-now.json').then((data) => {
    const obj = {
      lat: Number(data.iss_position.latitude),
      lng: Number(data.iss_position.longitude),
      timestamp: Number(data.timestamp),
    }
    initMap(obj.lat, obj.lng)
    showCurrentTime(obj.timestamp)
    showLocation(obj.lat, obj.lng)
    getPeople()
  })
}
// fetched location

async function getPeople() {
  await getData('http://api.open-notify.org/astros.json').then((data) => {
    showPeople(data.people)
  })
}
// fetched astros

function showPeople(data) {
  const list = document.querySelector('.list-group')
  list.innerHTML = ''
  
  const total = (document.getElementById(
    'total'
  ).textContent = `Total people in ISS: ${data.length}`)
  const res = data.map((item) => {
    const listItem = document.createElement('li')
    listItem.classList.add('list-group-item')
    listItem.innerHTML = item.name
    list.append(listItem)
  })
}
// show list people in ISS

function showLocation(lat = 0, lng = 0) {
  document.getElementById(
    'locatedInfo'
  ).textContent = `Longitude: ${lat} Latitude: ${lng}`
}
// show current location

function showCurrentTime(UNIX_timestamp) {
  let timestamp = new Date(UNIX_timestamp * 1000)
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let dayName = [
    'Monday',
    'Thusday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  let year = timestamp.getFullYear()
  let month = months[timestamp.getMonth()]
  let date = timestamp.getDate()
  let day = dayName[timestamp.getDay()]
  let hour = timestamp.getHours()
  let min = timestamp.getMinutes()
  let time = `${hour}:${min}, ${day}, ${date} ${month} ${year}`

  return (document.getElementById('currentTime').textContent = time)
}
//show current time

function initMap(lat = 0, lng = 0) {
  const myLatLng = { lat: lat, lng: lng }
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng,
  })
  new google.maps.Marker({
    position: myLatLng,
    map,
  })
}
// initial map

getLocation()
// call function 

setInterval(() => {
  getLocation()
}, 5000)