'use strict';

// зададим массивы данных, которые опишут магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

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

  wizardElement.querySelector('.setup-similar-label').textContent = wizardObject.name; // находим в ДОМ div c классом .setup-similar-label и задаем ему текстовое содержимое
  wizardElement.querySelector('.wizard-coat').style.fill = wizardObject.coatColor; // по аналогии с цветами
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;

  return wizardElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderWizards = function (wizardsArray) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment (пустой div)
  var similarListElement = document.querySelector('.setup-similar-list'); // находим в разметке блок с классом setup-simular-list
  for (var i = 0; i < wizardsArray.length; i++) { // условия работы цикла, идет переборка массива случайно созданных волшебников
    fragment.appendChild(fillWizard(wizardsArray[i])); // добавляет созданного волшебника во фрагмент
  }
  similarListElement.appendChild(fragment); // добавляет фрагмент в разметку
  document.querySelector('.setup-similar').classList.remove('hidden'); // отключает класс hidden у окна,отображающего сгененрированнвх волшебников в модалке
};

renderWizards(wizards);
showUserDialog();
