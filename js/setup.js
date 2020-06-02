'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EAYS_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

var getRandomValueArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var wizardsFullNames = function (name, lastname) {
  var wizardName = getRandomValueArr(name);
  var wizardLastname = getRandomValueArr(lastname);
  return wizardName + wizardLastname;
};

var wizardsRandomCreate = function (count) {
  var wizardArr = [];

  for (var i = 0; i < count; i++) {
    var coatColor = getRandomValueArr(COAT_COLORS);
    var eyesColor = getRandomValueArr(EYES_COLORS);

    wizardArr.push({
      name: name,
      coatColor: coatColor,
      eyasColor: eyesColor
    });
  }
  return wizardArr;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
