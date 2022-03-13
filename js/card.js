import {mockArray} from './create-mock-object.js';
import {makeElement} from './util.js';

const similarListElement = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarListFragment = document.createDocumentFragment();

mockArray.forEach(({offer, author}) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  const popupPhoto = cardElement.querySelector('.popup__photos');
  popupPhoto.innerHTML = '';

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  let type = '';
  switch(offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalow':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
    case 'hotel':
      type = 'Отель';
      break;
    default:
      type = 'Неизвестно';
      break;
  }

  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = offer.features;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  offer.photos.forEach((elem) => {
    const photo = makeElement('img', 'popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    photo.src = elem;

    popupPhoto.appendChild(photo);
  });

  similarListFragment.appendChild(cardElement);
});

similarListElement.appendChild(similarListFragment);
