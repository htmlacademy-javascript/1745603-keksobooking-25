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


// Проверка поля

formNotis.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    formNotis.querySelector('.ad-form__submit').disabled = true;
  }
});

export{changePageActitvity};
