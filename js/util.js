const ALERT_SHOW_TIME = 5000;

// Получение рандомного числа

const getRandomNumber = (minValue, maxValue) => {
  if (minValue < 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

const getRandomItem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

// создание нового HTML элемента

const makeElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};

// Показ сообщения об ошибке при отправке неверной формы

const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.style.zIndex = 100;
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = '0';
  alertContainerElement.style.top = '0';
  alertContainerElement.style.right = '0';
  alertContainerElement.style.padding = '10px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';

  alertContainerElement.textContent = message;

  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

// export {getRandomNumber, getRandomItem, getRandomValue, getRandomArray, makeElement, showAlert};

export {getRandomNumber, getRandomItem, makeElement, showAlert};
