import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getSomeRandomValue
} from './functions.js';

// Данные для обтектов бронирования
const HEADERS = [
  'Дом с видом на море',
  'Апартаменты в центре города',
  'Уютная квартира с балконом',
  'Хостел',
  'Деревянный дом в горах',
  'Отель Фортуна',
  'Студия в центре',
  'Сдаю палатку в лесу',
  'Квартира в бабукином стиле',
  'Лофт отель'
];

const PRICE = {
  min: 100,
  max: 100000
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECK_IN_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const DESCRIPTIONS = [
  'Идеальное место для отдыха, до моря 5 минут.',
  'Метро рядом, остальное не важно',
  'Место спойное, но медведи иногда захаживают',
  'Квартира топ за свои деньги',
  '2х спальная кровать, завтрак включен',
  'Лучше места не найдете',
  'Лучшие закаты только с моего балкона',
  '4 спальни и гостинная, во дворе баня',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LAT = {
  min: 35.65000,
  max: 35.70000
};

const LNG = {
  min: 139.70000,
  max: 139.80000
};

// Генератор случайного уникального пользователя
const USERS_COUNT = 10;
const photosNumber = [];
function getRandomNoRepeatInteger(a = 1, b = USERS_COUNT) {
  let result = getRandomPositiveInteger(a, b);
  if (photosNumber.includes(result)) {
    while (photosNumber.includes(result)) {
      result = getRandomPositiveInteger(a, b);
    }
  }
  photosNumber.push(result);
  result = result < 10 ? `0${result}` : result;
  return result;
}

// Генератор случайного обьекта бронирования
const CreateRandomHouse = () => {
  const author = {
    avatar: `img/avatars/user${getRandomNoRepeatInteger()}.png`
  };
  const location = {
    lat: getRandomPositiveFloat(LAT.min, LAT.max),
    lng: getRandomPositiveFloat(LNG.min, LNG.max)
  };
  const offer = {
    title: getRandomArrayElement(HEADERS),
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(PRICE.min, PRICE.max),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(1, 10),
    guests: getRandomPositiveInteger(1, 10),
    checkin: getRandomArrayElement(CHECK_IN_OUT_TIME),
    checkout: getRandomArrayElement(CHECK_IN_OUT_TIME),
    features: getSomeRandomValue(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getSomeRandomValue(PHOTOS)
  };
  return {
    author,
    location,
    offer
  };
};

const createElements = () => Array.from({ length: 10 }, CreateRandomHouse);

export {createElements};

