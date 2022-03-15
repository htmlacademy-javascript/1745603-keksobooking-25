const formNotis = document.querySelector('.ad-form');
const fieldFormHeader = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const arrSelect = mapFilters.querySelectorAll('select');

function pageUnActive() {
  formNotis.classList.add('.ad-form--disabled');
  mapFilters.classList.add('.map__filters--disabled');

  fieldFormHeader.forEach((element) => {
    element.disabled = true;
  });

  arrSelect.forEach((element) => {
    element.disabled = true;
  });
}

pageUnActive();

function pageActive() {
  formNotis.classList.remove('.ad-form--disabled');
  mapFilters.classList.remove('.map__filters--disabled');

  fieldFormHeader.forEach((element) => {
    element.disabled = false;
  });

  arrSelect.forEach((element) => {
    element.disabled = false;
  });
}

pageActive();
