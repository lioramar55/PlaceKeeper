'use strict'

var map

function onInit() {
  navigator.geolocation
  renderSaveLocation()
}

function initMap() {
  var eilatCenter = { lat: 29.55805, lng: 34.94821 }
  var elMap = document.querySelector('#map')
  var position = {
    center: eilatCenter,
    zoom: 10,
  }

  // Creating the map
  map = new google.maps.Map(elMap, position)

  // Placing the first marker on eilat
  new google.maps.Marker({
    position: eilatCenter,
    map,
    title: 'Hello World!',
  })

  // My-location button image
  const locationBtn = document.createElement('img')
  locationBtn.src = 'imgs/my-location.png'
  locationBtn.classList.add('my-location')

  // locating the button on the map
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(locationBtn)

  // add even listener to move to curr user location
  locationBtn.addEventListener('click', (event) => {
    moveToCurrLocation(map, event)
  })

  // add event listener that places markers
  map.addListener('click', (mapsMouseEvent) => {
    saveLocation(map, mapsMouseEvent)
  })

  // checking if there are saved location, if yes putting their markers on the map
  var savedLocations = getUserSavedLocations()
  if (!savedLocations) return
  if (savedLocations.length) {
    savedLocations.forEach((location) => {
      new google.maps.Marker({
        position: location.position,
        map,
      })
    })
  }
}

function moveToCurrLocation(map, ev) {
  ev.stopPropagation()
  // HTML 5 Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // success callback
        const pos = { lat: position.coords.latitude, lng: position.coords.longitude }
        new google.maps.Marker({
          position: pos,
          map,
          title: 'Hello World!',
        })
        map.setCenter(pos)
      },
      // error callback
      () => {
        handleLocationError(true, infoWindow, map.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

function saveLocation(map, mapsMouseEvent) {
  var locationName = prompt('Save this place by name:')
  if (!locationName) return
  var location = mapsMouseEvent.latLng.toJSON()
  var position = { lat: location.lat, lng: location.lng }
  saveUserLocation(locationName, position)
  new google.maps.Marker({
    position,
    map,
  })
  renderSaveLocation()
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
}

function renderSaveLocation() {
  var locations = getUserSavedLocations()
  if (!locations || !locations.length) return
  var strHTML = locations.map((loc) => {
    return `<li data-lat="${loc.position.lat}" data-lng="${loc.position.lng}">${loc.locationName}</li>`
  })
  document.querySelector('.saved-locations ul').innerHTML = strHTML.join('')
  document.querySelectorAll('.saved-locations li').forEach((el) => {
    el.onclick = moveMapTo
  })
}

function moveMapTo() {
  var lat = +this.dataset.lat
  var lng = +this.dataset.lng
  map.setCenter({ lat, lng })
}
