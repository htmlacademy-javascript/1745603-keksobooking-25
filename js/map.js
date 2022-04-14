import {makeElement} from './util.js';
import {getData} from './api.js';
import {filterElements, filterRules} from './map-filters.js';

const MAXCARDS = 10;

// Главная метка на карте
const defaultPoint = {
  lat: 35.686726,
  lng: 139.741936,
};

const resetButton = document.querySelector('.ad-form__reset');

const L = window.L;
const map = L.map('map-canvas')
  .setView(defaultPoint, 12);

const fieldAddress = document.querySelector('#address');
fieldAddress.value = `${defaultPoint.lat.toFixed(5)}, ${defaultPoint.lng.toFixed(5)}`;

// Метки похожих объявлений

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  defaultPoint,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.on('moveend', (evt) => {
  map.closePopup();
  const {lat, lng} = evt.target.getLatLng();
  fieldAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

mainPinMarker.addTo(map);

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(defaultPoint);

  map.setView(defaultPoint, 9);
});

const createCustomPopup = ({offer, author}) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const popupPhoto = popupElement.querySelector('.popup__photos');
  popupPhoto.innerHTML = '';
  const popupFeatures = popupElement.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  if (offer.features) {
    offer.features.forEach((el) => {
      const li = makeElement('li', 'popup__feature');
      li.classList.add(`popup__feature--${el}`);
      popupFeatures.appendChild(li);
    });
  }

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
  popupElement.querySelector('.popup__description').textContent = offer.description;
  popupElement.querySelector('.popup__avatar').src = author.avatar;

  if (offer.photos) {
    offer.photos.forEach((elem) => {
      const photo = makeElement('img', 'popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photo.src = elem;

      popupPhoto.appendChild(photo);
    });
  }
  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const mapMarkers = [];

const renderMarkers = (element) => {
  const {lat, lng} = element.location;
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
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
    .bindPopup(
      createCustomPopup(element),
      {
        keepInView: true
      }
    );
  mapMarkers.push(marker);
};

let data;

getData((cards) => {
  cards
    .slice()
    .slice(0, MAXCARDS)
    .forEach((point) => {
      renderMarkers(point);
    });

  data = [...cards];

  filterElements.forEach((el) => {
    el.addEventListener('change', () => {
      for (let i = 0; i < mapMarkers.length; i++) {
        map.removeLayer(mapMarkers[i]);
      }

      data
        .slice()
        .filter(filterRules)
        .slice(0, MAXCARDS)
        .forEach((point) =>
        {
          setTimeout(() => {
            renderMarkers(point);
          }, 500);
        }
        );
    });
  });

});

export {map};
