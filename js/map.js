import { changeFormStatus } from './form.js';
import { generateCards } from './create-cards.js';
import { pristine } from './form.js';

//Настройка карты
const LOCATION = {
  lat: 35.6895000,
  lng: 139.6917100
};
const map = L.map('map-canvas')
  .on('load', () => {
    changeFormStatus(true);
  })
  .setView({
    lat: LOCATION.lat,
    lng: LOCATION.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Маркер добавления адреса
const addessMarkerIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  }
);

const addessMarker = L.marker(
  {
    lat: LOCATION.lat,
    lng: LOCATION.lng,
  },
  {
    draggable: true,
    icon: addessMarkerIcon,
  }
);
addessMarker.addTo(map);

//Валидация поля адреса
const getStringForLocation = (location) => {
  const {lat, lng} = location;
  return `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

const address = document.querySelector('#address');
const checkAddress = () => getStringForLocation(addessMarker.getLatLng()) === address.value;
pristine.addValidator(address, checkAddress, 'Укажите адрес на карте');

address.addEventListener('change', () => {
  pristine.validate(address);
});

addessMarker.on('moveend', (evt) => {
  document.querySelector('#address').value = getStringForLocation(evt.target.getLatLng());
  pristine.validate(address);
});

//Маркеры обьявлений
const houseMarkerIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }
);

const displayMarkers = (houses) => {
  houses.forEach(({ location, author, offer }) => {
    const houseMarkers = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: houseMarkerIcon,
      }
    );
    houseMarkers
      .addTo(map)
      .bindPopup(generateCards(author, offer));

  });
};

export {displayMarkers};
