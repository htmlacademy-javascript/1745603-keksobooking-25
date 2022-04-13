import { map } from './map.js';

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

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const filterType = (a) => type.value !== 'any' ? a.offer.type === type.value : true;
const filterRooms = (a) => rooms.value !== 'any' ? a.offer.rooms === Number(rooms.value) : true;
const filterGuests = (a) => guests.value !== 'any' ? a.offer.guests === Number(guests.value) : true;

const filterPrice = (a) => {

  switch (price.value) {
    case 'middle':
      return a.offer.price > MIN_PRICE && a.offer.price < MAX_PRICE;
    case 'low':
      return a.offer.price < MIN_PRICE;
    case 'hight':
      return a.offer.price > MAX_PRICE;
    case 'any':
      return true;
  }
};

const filterFeatures = (a) => {
  const checkedVal = features.querySelectorAll('.map__checkbox:checked');
  if (!a.offer.features) {
    return false;
  }

  for (const elem of checkedVal) {
    if(!a.offer.features.includes(elem.value)) {
      return false;
    }
  }
  return true;
};

const filterRules = (el) => filterType(el) && filterRooms(el) && filterGuests(el) && filterPrice(el) && filterFeatures(el);
export {filterElements, filterRules};
