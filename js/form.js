import {sendData} from './api.js';

const formNotis = document.querySelector('.ad-form');
const main = document.querySelector('main');
const roomsField = formNotis.querySelector('[name="rooms"]');
const capacityField = formNotis.querySelector('[name="capacity"]');
const priceField = formNotis.querySelector('#price');
const typeField = formNotis.querySelector('#type');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const timeinField = formNotis.querySelector('#timein');
const timeoutField = formNotis.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const fieldPrice = document.querySelector('#price');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

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

changePageActitvity(false);

// Валидация формы

const pristine = new Pristine(formNotis, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__label',
});

// синхронизация поля «Количество комнат»  с полем «Количество мест»

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

function validateAmount () {
  return minPrice[typeField.value] <= priceField.value;
}

function getAmountErrorMessage () {
  return `минимальная цена за ночь ${minPrice[typeField.value]}`;
}

pristine.addValidator(priceField, validateAmount, getAmountErrorMessage);

// Синхронизация полей «Время заезда» и «Время выезда»

timeinField.addEventListener('change', () => {
  timeoutField.value = timeinField.value;
});

timeoutField.addEventListener('change', () => {
  timeinField.value = timeoutField.value;
});

// Слайдер для поля с ценной

noUiSlider.create(sliderElement, {
  range: {
    min: minPrice[typeField.value],
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  fieldPrice.value = sliderElement.noUiSlider.get();
});

typeField.addEventListener('change', (evt) => {
  evt.preventDefault();

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice[typeField.value],
      max: 100000
    },
    start: 1000,
    step: 1
  });
  sliderElement.noUiSlider.set(evt.target.selected);
});

// Сообщения об успешной или не очень отправки формы

const openMessage = (messageTemplate) => {
  const element = messageTemplate.cloneNode(true);
  element.style.zIndex = 30000;

  main.addEventListener('click', () => {
    element.style.display = 'none';
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      element.style.display = 'none';
    }
  }, true);

  main.append(element);
};

const messageSuccess = () => openMessage(templateSuccess);
const messageError = () => openMessage(templateError);

// Проверка всей формы


formNotis.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(
      () => {
        messageSuccess();
        formNotis.reset();},
      () => {
        messageError();},
      formData
    );

  } else {
    formNotis.querySelector('.ad-form__submit').disabled = true;
  }
});

export{changePageActitvity};
