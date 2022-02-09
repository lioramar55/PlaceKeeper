'use strict';

function onInit() {
  document.querySelector('form').addEventListener('submit', onFormSubmit);
  document.querySelector('[type=range]').onclick = onRangeChange;
}

function onFormSubmit(ev) {
  ev.preventDefault();
  var email = document.querySelector('[type=email]').value;
  var age = document.querySelector('[type=range]').value;
  var bgColor = document.querySelector('#bg-color').value;
  var textColor = document.querySelector('#text-color').value;
  var birthDate = document.querySelector('[type=date]').value;
  var birthTime = document.querySelector('[type=time]').value;
}

function onRangeChange() {
  var elVal = document.querySelector('.ageVal');
  elVal.innerText = document.querySelector('[type=range]').value;
}
