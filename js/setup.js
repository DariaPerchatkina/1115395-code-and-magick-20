'use strict';

var userDialog = document.querySelector('.setup'); // находим окно настройки пользователя
userDialog.classList.remove('hidden'); // и показыаем окно убирая класс hidden

document.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
var similarListElement = userDialog.querySelector('.setup-similar-list'); // шаблон, который будем копировать

var similarWizardTemplate = document.querySelector('#similar-wizard-template') // находим элемент темплейт, куда вставим похожих магов
  .content
  .querySelector('.setup-similar-item');

// зададим массивы данных, которые опишут магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

// находит рандомное число из массива
var getRandomValueArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// полное имя волшенбника, создаваемое рандомно
var wizardsFullNames = function (name, lastname) {
  var wizardName = getRandomValueArr(name);
  var wizardLastname = getRandomValueArr(lastname);
  return wizardName + wizardLastname;
};

// cоздаем пустой массив, куда мы запишем свойства для каждого волшебника - имя, цвет плаща и цвет глаз
var wizardsRandomCreate = function (count) {
  var wizardArr = []; // пустой массив

  for (var i = 0; i < count; i++) {
    var name = wizardsFullNames(WIZARD_NAMES, WIZARD_LASTNAMES); // обьявим переменную для генерации имен волшебников
    var coatColor = getRandomValueArr(COAT_COLOR);
    var eyesColor = getRandomValueArr(EYES_COLOR);

    wizardArr.push({
      name: name,
      coatColor: coatColor,
      eyasColor: eyesColor // НЕ ПОЛУЧИЛОСЬ ПЕРЕКЛЮЧИТЬ ЦВЕТ ГЛАЗ
    });
  }
  return wizardArr; // возвращает массив волшеников
};

var wizards = wizardsRandomCreate(WIZARD_COUNT); // сгенерированные 4 волшебника

var renderWizard = function (wizard) { // создаем функцию, которая отрисовывает магов
  var wizardElement = similarWizardTemplate.cloneNode(true); // делаем дубликат узла template

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // находим в ДОМ div c классом .setup-similar-label и задаем ему текстовое содержимое
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // по аналогии с цветами
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderWizards = function (wizardsElem) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
  for (var i = 0; i < wizardsElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных волшебников
    fragment.appendChild(renderWizard(wizardsElem[i])); // добавляет созданного волшебника во фрагмент
  }
  similarListElement.appendChild(fragment); // добавляет фрагмент в разметку
};
renderWizards(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // отключает класс hidden у окна,отображающего сгененрированнвх волшебников в модалке
