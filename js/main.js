function getRandomNumber (minValue, maxValue) {
  if (minValue < 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

getRandomNumber(1, 10);

function getRandomValue (minValue, maxValue, range) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  const rundomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(rundomNumber.toFixed(range));
}

getRandomValue(1, 5, 2);
