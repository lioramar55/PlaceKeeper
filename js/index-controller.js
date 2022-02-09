'use strict'

function onInit() {
  var userSettings = getUserSettings()
  if (userSettings) {
    document.querySelector('h3').style.display = 'block'
    document.querySelector('h3 span').innerText = hoursToNextBirthday()
  }
}
