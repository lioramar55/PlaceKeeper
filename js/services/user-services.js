'use strict'

const storageKey = 'user-settings'
var userService = {}

function formSubmit(user) {
  saveToStorage(storageKey, user)
  userService = { ...user }
  console.log('userService.birthDate', userService.birthTime)
}

function getUserSettings() {
  var userSettings = loadFromStorage(storageKey)
  userService = { ...userSettings }
  console.log('userSettings', userSettings)
  if (!userSettings) return
  return userSettings
}

function hoursToNextBirthday() {
  var [, months, days] = userService.birthDate.split('-')
  var [hours, minutes] = userService.birthTime.split(':')
  console.log('days, months', days, months)
  var today = new Date()
  var birthDay = new Date(new Date().getFullYear(), months - 1, days, hours, minutes)
  if (birthDay.getTime() < today.getTime()) {
    birthDay.setFullYear(birthDay.getFullYear() + 1)
  }
  var result = birthDay.getTime() - today.getTime()
  return Math.floor(result / (1000 * 60 * 60))
}
