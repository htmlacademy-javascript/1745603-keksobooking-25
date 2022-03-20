const formNotis = document.querySelector('.ad-form');

// Активное/неактивное состояние страницы

function changePageActitvity(changeToActive) {
  const fieldFormHeader = document.querySelectorAll('fieldset');
  const mapFilters = document.querySelector('.map__filters');
  const arrSelect = mapFilters.querySelectorAll('select');

  formNotis.classList[changeToActive ? 'add' : 'remove']('.ad-form--disabled');
  mapFilters.classList[changeToActive ? 'add' : 'remove']('.map__filters--disabled');

  fieldFormHeader.forEach((element) => {
    element.disabled = !changeToActive;
  });

  arrSelect.forEach((element) => {
    element.disabled = !changeToActive;
  });
}

// Валидация формы

const pristine = new Pristine(formNotis, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__label',
});


// синхронизация поля «Количество комнат»  с полем «Количество мест»

const roomsField = formNotis.querySelector('[name="rooms"]');
const capacityField = formNotis.querySelector('[name="capacity"]');

function getQtyRooms (rooms) {
  let i = 1;
  const arr = [];
  if (rooms >= 100){
    arr.push('0');
    return arr;
  }
  while(i <= rooms) {
    arr.push(i.toString());
    i++;
  }
  return arr;
}

function validateRooms () {
  return getQtyRooms(roomsField.value).includes(capacityField.value);
}

function getCapacityErrorMessage () {
  return 'Кол-во гостей должно быть равное или меньше кол-ву комнат';
}

pristine.addValidator(capacityField, validateRooms, getCapacityErrorMessage);


// Поле «Тип жилья»

const priceField = formNotis.querySelector('#price');
const typeField = formNotis.querySelector('#type');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateAmount () {
  return minPrice[typeField.value] <= priceField.value;
}

function getAmountErrorMessage () {
  return `минимальная цена за ночь ${minPrice[typeField.value]}`;
}

pristine.addValidator(priceField, validateAmount, getAmountErrorMessage);

// Синхронизация полей «Время заезда» и «Время выезда»

const timeinField = formNotis.querySelector('#timein');
const timeoutField = formNotis.querySelector('#timeout');

timeinField.addEventListener('change', () => {
  switch(timeinField.value) {
    case '12:00' :
      timeoutField.value = timeinField.value; break;
    case '13:00' :
      timeoutField.value = timeinField.value; break;
    case '14:00' :
      timeoutField.value = timeinField.value; break;
  }
});

timeoutField.addEventListener('change', () => {
  switch(timeoutField.value) {
    case '12:00' :
      timeinField.value = timeoutField.value; break;
    case '13:00' :
      timeinField.value = timeoutField.value; break;
    case '14:00' :
      timeinField.value = timeoutField.value; break;
  }
});

// Проверка всей формы

formNotis.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    formNotis.querySelector('.ad-form__submit').disabled = true;
  }
});

export{changePageActitvity};
