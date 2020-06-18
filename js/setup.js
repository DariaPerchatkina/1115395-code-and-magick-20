'use strict';

// зададим массивы данных, которые опишут магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColorArr = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_COUNT = 4;
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var userNameInput = document.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var fireballSetup = setup.querySelector('.setup-fireball-wrap');

var showUserDialog = function () {
  var userDialog = document.querySelector('.setup'); // находим окно настройки пользователя
  userDialog.classList.remove('hidden'); // и показыаем окно убирая класс hidden
};

// находит рандомное число из массива
var getRandomValueFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// полное имя волшенбника, создаваемое рандомно
var getWizardsFullName = function (name, lastName) {
  var wizardName = getRandomValueFromArr(name);
  var wizardLastName = getRandomValueFromArr(lastName);
  return wizardName + wizardLastName;
};

// cоздаем пустой массив, куда мы запишем свойства для каждого волшебника - имя, цвет плаща и цвет глаз
var createWizardsRandom = function (count) {
  var wizardsArr = []; // пустой массив

  for (var i = 0; i < count; i++) {
    var name = getWizardsFullName(WIZARD_NAMES, WIZARD_LASTNAMES); // обьявим переменную для генерации имен волшебников
    var coatColor = getRandomValueFromArr(COAT_COLOR);
    var eyesColor = getRandomValueFromArr(EYES_COLOR);

    wizardsArr.push({
      name: name,
      coatColor: coatColor,
      eyesColor: eyesColor
    });
  }
  return wizardsArr; // возвращает массив волшеников
};

var wizards = createWizardsRandom(WIZARD_COUNT); // сгенерированные 4 волшебника

var fillWizard = function (wizardObject) { // создаем функцию, которая отрисовывает магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template') // находим элемент темплейт, куда вставим похожих магов
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true); // делаем дубликат узла template

  var wizardNameElement = wizardElement.querySelector('.setup-similar-label');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  wizardNameElement.textContent = wizardObject.name;
  wizardCoatElement.style.fill = wizardObject.coatColor;
  wizardEyesElement.style.fill = wizardObject.eyesColor;

  return wizardElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderWizards = function (wizardsArray) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment (пустой div)
  var similarListElement = document.querySelector('.setup-similar-list'); // находим в разметке блок с классом setup-simular-list
  for (var i = 0; i < wizardsArray.length; i++) { // условия работы цикла, идет переборка массива случайно созданных волшебников
    fragment.appendChild(fillWizard(wizardsArray[i])); // добавляет созданного волшебника во фрагмент
  }
  similarListElement.appendChild(fragment); // добавляет фрагмент в разметку

  var showWizardsList = document.querySelector('.setup-similar'); // находим список с сгенерированными волшебниками
  showWizardsList.classList.remove('hidden'); // показываем список в модалке
};

renderWizards(wizards);
showUserDialog();

// функция выполнит закрытие попапа по событию- нажатие кнопки escape
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

// открытие попапа по событию нажания esc
var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

// закрытие попапа по событию нажатия esc
var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

// слушает событие клик, открывающее попап
setupOpen.addEventListener('click', function () {
  openPopup();
});

// слушает событие нажатие клавиши esc и открывает попап
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

// слушает событие клик и закрывет окно(добавляет класс hidden)
setupClose.addEventListener('click', function () {
  closePopup();
});

// слушает событие нажатие на enter и закрывает окно(добавляет класс hidden)
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// валидация - проверка на заполненеие строки
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// проверка на длину имени
userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// изменение цвета мантии
wizardCoat.addEventListener('click', function () {
  var playerWizardCoatColor = getRandomValueFromArr(COAT_COLOR);
  wizardCoat.style.fill = playerWizardCoatColor;
  setup.querySelector('.setup-player').querySelector('input[name="coat-color"]').value = playerWizardCoatColor;
});


// изменение цвета глаз
wizardEyes.addEventListener('click', function () {
  var playerWizardEyesColor = getRandomValueFromArr(EYES_COLOR);
  wizardEyes.style.fill = playerWizardEyesColor;
  setup.querySelector('.setup-player').querySelector('input[name="eyes-color"]').value = playerWizardEyesColor;
});

// изменение цвета фверболаа
fireballSetup.addEventListener('click', function () {
  var playerFireballColor = getRandomValueFromArr(fireballColorArr);
  fireballSetup.style.background = playerFireballColor;
  fireballSetup.querySelector('input').value = playerFireballColor;
});
