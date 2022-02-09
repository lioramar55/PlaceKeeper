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
  var map = new google.maps.Map(elMap, position)
  var marker = new google.maps.Marker({
    position: eilatCenter,
    map,
    title: 'Hello World!',
  })
}
