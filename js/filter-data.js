import {debounce, showAlert} from './functions.js';
import { displayMarkers } from './map.js';
import { getData } from './database.js';

const filtersElements = document.querySelector('.map__filters');
const MAX_DISPLAY_MARKERS = 10;
const DEFAULT_FILTER = 'any';
//Фильтр по типу
const filterType = (element) => {
  const typeValue = document.querySelector('#housing-type').value;
  if (typeValue === DEFAULT_FILTER) {
    return true;
  } else {
    return typeValue === element.offer.type;
  }
};

//Фьльтр по цене
const MIDDLE_FILTER_PRICE = {
  name: 'middle',
  price: {
    min: 10000,
    max: 50000,
  }
};
const LOW_FILTER_PRICE = {
  name: 'low',
  price: 10000
};
const HIGH_FILTER_PRICE ={
  name: 'high',
  price: 50000
};

const filterPrice = (element) => {
  const priceValue = document.querySelector('#housing-price').value;
  switch (priceValue) {
    case DEFAULT_FILTER:
      return true;
    case MIDDLE_FILTER_PRICE.name:
      return ((element.offer.price >= MIDDLE_FILTER_PRICE.price.min) && (element.offer.price <= MIDDLE_FILTER_PRICE.price.max));
    case LOW_FILTER_PRICE.name:
      return (element.offer.price < LOW_FILTER_PRICE.price);
    case HIGH_FILTER_PRICE.name:
      return (element.offer.price > HIGH_FILTER_PRICE.price);
  }
};

//Фильтрация по количеству комнат
const filterRooms = (element) => {
  const filterValue = document.querySelector('#housing-rooms').value;
  if (filterValue === DEFAULT_FILTER) {
    return true;
  } else{
    return +filterValue === element.offer.rooms;
  }
};

//Фильтрация по количеству гостей
const filterGuests = (element) => {
  const filterValue = document.querySelector('#housing-guests').value;
  if (filterValue === DEFAULT_FILTER) {
    return true;
  } else{
    return +filterValue === element.offer.guests;
  }
};

//Фильтрация по удобствам
const filterFeatures = (element) => {
  const featureValues = document.querySelector('#housing-features').querySelectorAll('input:checked');
  if (featureValues.length === 0) {
    return true;
  }
  const checked = [];
  featureValues.forEach((el) => checked.push(el.value));
  return (element.offer.features) ? checked.every((el) => (element.offer.features.includes(el))) : false;
};

const filterAndDisplayData = (houses) => {
  const filteredData = houses
    .filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeatures)
    .slice(0, MAX_DISPLAY_MARKERS);
  displayMarkers(filteredData);
};

//Обработчик на форму c отсрочкой
const SET_TIMEOUT = 500;
const onChangeFilters = () => {
  getData(filterAndDisplayData, showAlert);
};
const onChangeDebounce = debounce(onChangeFilters, SET_TIMEOUT);
filtersElements.addEventListener('change', onChangeDebounce);

export{filterAndDisplayData};
