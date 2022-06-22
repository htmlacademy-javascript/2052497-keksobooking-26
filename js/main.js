// Данные для обтектов бронирования
const title = [
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
const price = {
  min: 100,
  max: 100000
};
const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const checkInOutTime = [
  '12:00',
  '13:00',
  '14:00'
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const description = [
  'Идеальное место для отдыха, до моря 5 минут.',
  'Метро рядом, остальное не важно',
  'Место спойное, но медведи иногда захаживают',
  'Квартира топ за свои деньги',
  '2х спальная кровать, завтрак включен',
  'Лучше места не найдете',
  'Лучшие закаты только с моего балкона',
  '4 спальни и гостинная, во дворе баня',
];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const lat = {
  min: 35.65000,
  max: 35.70000
};
const lng = {
  min: 139.70000,
  max: 139.80000
};
// Генератор случайного целого чисела
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
//Генеротор случайного числа с плавающей точкой
function getRandomPositiveFloat(a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}
//Получаем случайное значение из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
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
//Получаем несколько случайных значений массива
function getSomeRandomValue(elements) {
  const arrRandom = [];
  const countValue = getRandomPositiveInteger(1, elements.length);
  let value = '';
  while (arrRandom.length < countValue) {
    value = getRandomArrayElement(elements);
    if (!arrRandom.includes(value)) {
      arrRandom.push(value);
    }
  }
  return arrRandom;
}
// Генератор случайного обьекта бронирования
const createRandomHouse = () => {
  const author = {
    avatar: `img/avatars/user${getRandomNoRepeatInteger()}.png`
  };
  const location = {
    lat: getRandomPositiveFloat(lat.min, lat.max),
    lng: getRandomPositiveFloat(lng.min, lng.max)
  };
  const offer = {
    title: getRandomArrayElement(title),
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(price.min, price.max),
    type: getRandomArrayElement(type),
    rooms: getRandomPositiveInteger(1, 10),
    guests: getRandomPositiveInteger(1, 10),
    checkin: getRandomArrayElement(checkInOutTime),
    ckeckout: getRandomArrayElement(checkInOutTime),
    features: getSomeRandomValue(features),
    description: getRandomArrayElement(description),
    photos: getRandomArrayElement(photos)
  };
  return {
    author,
    location,
    offer
  };
};

const house = Array.from({ length: 10 }, createRandomHouse);

