'use strict'

function onInit() {
  console.log('loadding')
  navigator.geolocation
}

function initMap() {
  var eilatCenter = { lat: 29.55805, lng: 34.94821 }
  var elMap = document.querySelector('#map')
  var position = {
    center: eilatCenter,
    zoom: 10,
  }

  // Creating the map
  let map = new google.maps.Map(elMap, position)

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
    moveToCurrLocation(event)
  })

  // add event listener that places markers
  map.addListener('click', (mapsMouseEvent) => {
    placeMarker(map, mapsMouseEvent)
  })
}

function moveToCurrLocation(ev) {
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

function placeMarker(map, mapsMouseEvent) {
  var location = mapsMouseEvent.latLng.toJSON()
  var position = { lat: location.lat, lng: location.lng }

  new google.maps.Marker({
    position,
    map,
  })
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
