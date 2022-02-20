function getRundomNumber (minValue, maxValue) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRundomValue (minValue, maxValue, range) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  const rundomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return rundomNumber.toFixed(range);
}

