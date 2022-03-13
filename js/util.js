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

// сОЗДАТЬ ФУНКЦИЮ makeElement (tagName, className)

function makeElement (tagName, className) {
  const newImg = document.createElement(tagName);
  newImg.classList.add(className);
  return newImg;
}

// const kxamlds = makeElement('img', 'popup');

// console.log(kxamlds);

export {getRandomNumber, getRandomItem, getRandomValue, getRandomArray, makeElement};
