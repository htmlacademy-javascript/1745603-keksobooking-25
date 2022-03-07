// Получение рандомного числа

export function getRandomNumber (minValue, maxValue) {
  if (minValue < 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export function getRandomItem(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}


// Получение числа с плавающей точкой

export function getRandomValue (minValue, maxValue, range) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  const rundomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(rundomNumber.toFixed(range));
}


// Создание массива рандомной длины

export function getRandomArray(array) {
  const arrayNew = new Array(getRandomNumber(1, array.length)).fill(' ');

  arrayNew.forEach((element, index) => {
    const ranItem = getRandomItem(array);

    arrayNew[index] = ranItem;
  });

  return [...new Set(arrayNew)];
}
