import {getRandomValue, getRandomNumber, getRandomItem, getRandomArray} from './util.js';
import {title, type, checkin, checkout, features, description, photos} from './data.js';

function createMockObject(imageNumber) {
  const locationData = {
    lat: getRandomValue(35.65000, 35.70000, 5),
    lng: getRandomValue(139.70000, 139.80000, 5)
  };

  return {
    author: {
      avatar: `img/avatars/user${imageNumber < 10 ? `0${imageNumber}` : imageNumber}.png`
    },
    offer: {
      title: getRandomItem(title),
      address: `${locationData.lat}, ${locationData.lng}`,
      price: getRandomNumber(10000, 30000),
      type: getRandomItem(type),
      rooms: getRandomNumber(1, 7),
      guests: getRandomNumber(1, 7),
      checkin: getRandomItem(checkin),
      checkout: getRandomItem(checkout),
      features: getRandomArray(features),
      description: getRandomItem(description),
      photos: getRandomArray(photos)
    },
    location: {
      lat: locationData.lat,
      lng: locationData.lng
    }
  };
}

// Создание длины массива с объектами

function createMockArray(amount) {
  const array = [];

  for (let i = 1; i <= amount; i++) {
    array.push(createMockObject(i));
  }

  return array;
}

const mockArray = createMockArray(1);

export {mockArray};
