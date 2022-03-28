import {mockArray} from './card.js';
import {makeElement} from './util.js';

// Главная метка на карте

const resetButton = document.querySelector('.ad-form__reset');

const map = L.map('map-canvas')
  .setView({
    lat: 35.686726,
    lng: 139.741936,
  }, 8);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.686726,
    lng: 139.741936,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.686726,
    lng: 139.741936,
  });

  map.setView({
    lat: 35.686726,
    lng: 139.741936,
  }, 8);
});

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  const fieldAddress = document.querySelector('#address');
  fieldAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

// Метки похожих объявлений

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createCustomPopup = ({offer, author}) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const popupPhoto = popupElement.querySelector('.popup__photos');
  popupPhoto.innerHTML = '';

  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  const typesMap = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  popupElement.querySelector('.popup__type').textContent = typesMap[offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelector('.popup__features').textContent = offer.features;
  popupElement.querySelector('.popup__description').textContent = offer.description;
  popupElement.querySelector('.popup__avatar').src = author.avatar;

  offer.photos.forEach((elem) => {
    const photo = makeElement('img', 'popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    photo.src = elem;

    popupPhoto.appendChild(photo);
  });

  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

mockArray.forEach((point) => {
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
});
