'use strict'

const storageKey = 'user-settings'
var gUser = { settings: {}, savedLocations: [] }

function formSubmit(userSettings) {
  gUser.settings = { ...userSettings }
  saveToStorage(storageKey, gUser)
}

function getUserSettings() {
  var user = loadFromStorage(storageKey)
  if (!user.settings) return
  return user.settings
}

function hoursToNextBirthday() {
  var [, months, days] = gUser.birthDate.split('-')
  var [hours, minutes] = gUser.birthTime.split(':')
  var today = new Date()
  var birthDay = new Date(new Date().getFullYear(), months - 1, days, hours, minutes)
  if (birthDay.getTime() < today.getTime()) {
    birthDay.setFullYear(birthDay.getFullYear() + 1)
  }
  var result = birthDay.getTime() - today.getTime()
  return Math.floor(result / (1000 * 60 * 60))
}

function saveUserLocation(locationName, position) {
  var user = loadFromStorage(storageKey)
  if (!user) user = { settings: {}, savedLocations: [] }
  user.savedLocations.push({ locationName, position, id: getId() })
  saveToStorage(storageKey, user)
}

function getUserSavedLocations() {
  var user = loadFromStorage(storageKey)
  if (!user) return
  return user.savedLocations
}
