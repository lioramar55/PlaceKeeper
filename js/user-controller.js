'use strict'

function onInit() {
  document.querySelector('form').addEventListener('submit', onFormSubmit)
  document.querySelector('[type=range]').oninput = onRangeChange
  document.querySelector('[type=range]').value = 18
  renderUserSettings()
}

function renderUserSettings() {
  var userSettings = getUserSettings()
  if (!userSettings) return
  document.body.style.backgroundColor = userSettings.bgColor
  document.body.color = userSettings.textColor
}

function onRangeChange() {
  var elVal = document.querySelector('.ageVal')
  elVal.innerText = document.querySelector('[type=range]').value
}

function onFormSubmit(ev) {
  ev.preventDefault()
  var user = controlFormInputs()
  formSubmit(user)
  renderUserSettings()
}

function controlFormInputs(isReset, isExist) {
  var email = document.querySelector('[type=email]')
  var age = document.querySelector('[type=range]')
  var bgColor = document.querySelector('#bg-color')
  var textColor = document.querySelector('#text-color')
  var birthDate = document.querySelector('[type=date]')
  var birthTime = document.querySelector('[type=time]')
  var user = {
    email: email.value,
    age: age.value,
    bgColor: bgColor.value,
    textColor: textColor.value,
    birthDate: birthDate.value,
    birthTime: birthTime.value,
  }
  if (isReset) {
    email.value = email.defaultValue
    age.value = age.defaultValue
    bgColor.value = bgColor.defaultValue
    textColor.value = textColor.defaultValue
    birthDate.value = birthDate.defaultValue
    birthTime.value = birthTime.defaultValue
  }
  if (isExist) {
    var userSettings = getUserSettings()
    email.value = userSettings.email
    age.value = userSettings.age
    bgColor.value = userSettings.bgColor
    textColor.value = userSettings.textColor
    birthDate.value = userSettings.birthDate
    birthTime.value = userSettings.birthTime
  }
  return user
}
