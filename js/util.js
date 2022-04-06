// Получение рандомного числа

function getRandomNumber (minValue, maxValue) {
  if (minValue < 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomItem(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}


// Получение числа с плавающей точкой

function getRandomValue (minValue, maxValue, range) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  const rundomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(rundomNumber.toFixed(range));
}


// Создание массива рандомной длины

function getRandomArray(array) {
  const arrayNew = new Array(getRandomNumber(1, array.length)).fill(' ');

  arrayNew.forEach((element, index) => {
    const ranItem = getRandomItem(array);

    arrayNew[index] = ranItem;
  });

  return [...new Set(arrayNew)];
}

// создание нового HTML элемента

function makeElement (tagName, className) {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
}

// Показ сообщения об ошибке при отправке неверной формы
const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomItem, getRandomValue, getRandomArray, makeElement, showAlert};
