import {map} from './map.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const typeElement = document.querySelector('#housing-type');
const priceElement = document.querySelector('#housing-price');
const roomsElement = document.querySelector('#housing-rooms');
const guestsElement = document.querySelector('#housing-guests');
const featuresElement = document.querySelector('#housing-features');

const filterElements = [typeElement, priceElement, roomsElement, guestsElement, featuresElement];

filterElements.forEach((el) => {
  el.addEventListener('change', () => {
    map.closePopup();
  });
});

const filterType = (element) => typeElement.value !== 'any' ? element.offer.type === typeElement.value : true;
const filterRooms = (element) => roomsElement.value !== 'any' ? element.offer.rooms === Number(roomsElement.value) : true;
const filterGuests = (element) => guestsElement.value !== 'any' ? element.offer.guests === Number(guestsElement.value) : true;

const filterPrice = (element) => {
  switch (priceElement.value) {
    case 'middle':
      return element.offer.price > MIN_PRICE && element.offer.price < MAX_PRICE;
    case 'low':
      return element.offer.price < MIN_PRICE;
    case 'hight':
      return element.offer.price > MAX_PRICE;
    case 'any':
      return true;
  }
};

const filterFeatures = (element) => {
  const checkedValElements = featuresElement.querySelectorAll('.map__checkbox:checked');
  if (!element.offer.features) {
    return false;
  }

  for (const elem of checkedValElements) {
    if(!element.offer.features.includes(elem.value)) {
      return false;
    }
  }
  return true;
};

const filterRules = (el) => filterType(el) && filterRooms(el) && filterGuests(el) && filterPrice(el) && filterFeatures(el);

export {filterElements, filterRules};
