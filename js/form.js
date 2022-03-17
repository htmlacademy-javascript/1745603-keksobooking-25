function changePageActitvity(changeToActive) {
  const formNotis = document.querySelector('.ad-form');
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

export{changePageActitvity};
