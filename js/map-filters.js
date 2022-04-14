import { map } from './map.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const features = document.querySelector('#housing-features');

const filterElements = [type, price, rooms, guests, features];

filterElements.forEach((el) => {
  el.addEventListener('change', () => {
    map.closePopup();

  });
});

const filterType = (element) => type.value !== 'any' ? element.offer.type === type.value : true;
const filterRooms = (element) => rooms.value !== 'any' ? element.offer.rooms === Number(rooms.value) : true;
const filterGuests = (element) => guests.value !== 'any' ? element.offer.guests === Number(guests.value) : true;

const filterPrice = (element) => {
  switch (price.value) {
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
  const checkedVal = features.querySelectorAll('.map__checkbox:checked');
  if (!element.offer.features) {
    return false;
  }

  for (const elem of checkedVal) {
    if(!element.offer.features.includes(elem.value)) {
      return false;
    }
  }
  return true;
};

const filterRules = (el) => filterType(el) && filterRooms(el) && filterGuests(el) && filterPrice(el) && filterFeatures(el);
export {filterElements, filterRules};
