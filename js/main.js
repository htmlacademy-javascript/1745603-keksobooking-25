function getRandomNumber (minValue, maxValue) {
  if (minValue < 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomItem(arr) {
  const minValue = 0;
  const maxValue = arr.length -1;
  const random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return arr[random];
}

function getRandomValue (minValue, maxValue, range) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  const rundomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(rundomNumber.toFixed(range));
}

const title = ['Уютная квартирка в центре Токио', 'Квартира в Москве', 'Дом с небольшим двориком', 'Комната в общежитии',];
const  type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = ['Большое светлое пространство', 'Минималистичный дизайн', 'Свежий ремонт'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function createMockObject() {
  const locationData = {
    lat: getRandomValue(35.65000, 35.70000, 5),
    lng: getRandomValue(139.70000, 139.80000, 5)
  };

  const imageNumber = getRandomNumber(1,10);
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
      features: getRandomItem(features),
      description: getRandomItem(description),
      photos: getRandomItem(photos)
    },
    location: {
      lat: locationData.lat,
      lng: locationData.lng
    }
  };
}

const mockArray = [];

for (let i = 1; i <= 10; i++) {
  mockArray.push(createMockObject());
}
