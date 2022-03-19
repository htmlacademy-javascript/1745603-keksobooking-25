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
const choiceOfRooms = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function validateRooms () {
  return choiceOfRooms[roomsField.value].includes(capacityField.value);
}

function getCapacityErrorMessage () {
  return `
    ${'Кол-во гостей должно быть равное или меньше кол-ву комнат'}
  `;
}

pristine.addValidator(capacityField, validateRooms, getCapacityErrorMessage);


// Проверка поля

formNotis.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export{changePageActitvity};
