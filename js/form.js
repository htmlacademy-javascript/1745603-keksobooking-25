import {sendData} from './api.js';
import { mainPinMarker, defaultPoint, map } from './map.js';

const formNotisElement = document.querySelector('.ad-form');
const mainElement = document.querySelector('main');
const roomsFieldElement = formNotisElement.querySelector('[name="rooms"]');
const capacityFieldElement = formNotisElement.querySelector('[name="capacity"]');
const priceFieldElement = formNotisElement.querySelector('#price');
const typeFieldElement = formNotisElement.querySelector('#type');
const timeinFieldElement = formNotisElement.querySelector('#timein');
const timeoutFieldElement = formNotisElement.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const fieldPriceElement = document.querySelector('#price');
const templateSuccessElement = document.querySelector('#success').content.querySelector('.success');
const templateErrorElement = document.querySelector('#error').content.querySelector('.error');
const resetButtonElement = document.querySelector('.ad-form__reset');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

// Активное/неактивное состояние страницы

const changePageActitvity = (changeToActive) => {
  const fieldFormHeaderElement = document.querySelectorAll('fieldset');
  const mapFiltersElement = document.querySelector('.map__filters');
  const arrSelectElement = mapFiltersElement.querySelectorAll('select');

  formNotisElement.classList[changeToActive ? 'add' : 'remove']('.ad-form--disabled');
  mapFiltersElement.classList[changeToActive ? 'add' : 'remove']('.map__filters--disabled');

  fieldFormHeaderElement.forEach((element) => {
    element.disabled = !changeToActive;
  });

  arrSelectElement.forEach((element) => {
    element.disabled = !changeToActive;
  });
};

changePageActitvity(false);

// Валидация формы

const pristine = new Pristine(formNotisElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__label',
});

// синхронизация поля «Количество комнат»  с полем «Количество мест»

const getQtyRooms = (rooms) => {
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
};

const validateRooms = () => getQtyRooms(roomsFieldElement.value).includes(capacityFieldElement.value);

const getCapacityErrorMessage = () => 'Кол-во гостей должно быть равное или меньше кол-ву комнат';

pristine.addValidator(capacityFieldElement, validateRooms, getCapacityErrorMessage);


// Поле «Тип жилья»

const validateAmount = () => minPrice[typeFieldElement.value] <= priceFieldElement.value;

const getAmountErrorMessage = () => `минимальная цена за ночь ${minPrice[typeFieldElement.value]}`;

pristine.addValidator(priceFieldElement, validateAmount, getAmountErrorMessage);

// Синхронизация полей «Время заезда» и «Время выезда»

timeinFieldElement.addEventListener('change', () => {
  timeoutFieldElement.value = timeinFieldElement.value;
});

timeoutFieldElement.addEventListener('change', () => {
  timeinFieldElement.value = timeoutFieldElement.value;
});

// Слайдер для поля с ценной

noUiSlider.create(sliderElement, {
  range: {
    min: minPrice[typeFieldElement.value],
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  fieldPriceElement.value = sliderElement.noUiSlider.get();
});

typeFieldElement.addEventListener('change', (evt) => {
  evt.preventDefault();

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice[typeFieldElement.value],
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

  mainElement.addEventListener('click', () => {
    element.style.display = 'none';
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      element.style.display = 'none';
    }
  }, true);

  mainElement.append(element);
};

const messageSuccess = () => openMessage(templateSuccessElement);
const messageError = () => openMessage(templateErrorElement);

// Сброс введенных данных

const formReset = () => {
  const housingPhotoElement = document.querySelector('.ad-form__photo img');
  const previewImgElement = document.querySelector('.ad-form-header__preview img');
  const fieldAddressElement = document.querySelector('#address');

  mainPinMarker.setLatLng(defaultPoint);
  map.setView(defaultPoint, 12);

  previewImgElement.src = 'img/muffin-grey.svg';
  sliderElement.noUiSlider.set(1000);
  housingPhotoElement.remove('img');
  fieldAddressElement.value = `${defaultPoint.lat.toFixed(5)}, ${defaultPoint.lng.toFixed(5)}`;
};

resetButtonElement.addEventListener('click', () => {
  formReset();
});

// Проверка всей формы


formNotisElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(
      () => {
        messageSuccess();
        formNotisElement.reset();
        formReset();},
      () => {
        messageError();},
      formData
    );

  } else {
    formNotisElement.querySelector('.ad-form__submit').disabled = true;
  }
});

// export{changePageActitvity, sliderElement};
export{changePageActitvity};
