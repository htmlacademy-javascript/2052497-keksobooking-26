import { changeFormStatus } from './form.js';
import { generateCards } from './create-cards.js';


//Настройка карты
const map = L.map('map-canvas');

const LOCATION = {
  lat: 35.6895000,
  lng: 139.6917100
};

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

// Инициализация карты
const displayMap = () => {
  map.on('load', () => {
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

  addessMarker.addTo(map);
};

// Обработчик маркера адреса
const getStringForLocation = (location) => {
  const { lat, lng } = location;
  return `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

addessMarker.on('moveend', (evt) => {
  document.querySelector('#address').value = getStringForLocation(evt.target.getLatLng());
});

//Маркеры обьявлений
const houseMarkerIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }
);
const markerGroup = L.layerGroup().addTo(map);
const createMarker = (house) => {
  const { location, author, offer } = house;
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
    .addTo(markerGroup)
    .bindPopup(generateCards(author, offer));
};

const displayMarkers = (houses) => {
  markerGroup.clearLayers();
  houses.forEach((house) => {
    createMarker(house);
  });
};

// Сброс карты
const resetMap = () => {
  map.closePopup();
  addessMarker.setLatLng(L.latLng(LOCATION.lat, LOCATION.lng));
};

export { displayMarkers, resetMap, displayMap };
