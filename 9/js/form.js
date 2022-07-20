//status = булевые значения
const changeFormStatus = (status) => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  if (!status) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
};

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element--error'
});

//Добавляем слайдер
const price = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
});

//Валидация цен
const type = form.querySelector('#type');

const MinPrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};


const minPriceValidator = () => {
  if (+price.value >= MinPrice[type.value]) {
    return true;
  }
  return false;
};

const getPriceErrorMessage = () => `Минимальная цена для этого типа жилья ${MinPrice[type.value]}`;

pristine.addValidator(price, minPriceValidator, getPriceErrorMessage);

type.addEventListener('change', () => {
  price.value = MinPrice[type.value];
  sliderElement.noUiSlider.set(MinPrice[type.value]);
  pristine.validate(price);
});

sliderElement.noUiSlider.on('update', () => {
  price.value = Math.round(sliderElement.noUiSlider.get());
  pristine.validate(price);
});

price.addEventListener('input', () => {
  sliderElement.noUiSlider.set(price.value);
  pristine.validate(price);
});

//Валидация кол-ва гостей и комнат
const capacity = form.querySelector('#capacity');
const rooms = form.querySelector('#room_number');

const CapactyErrorMessage = {
  100: 'не для гостей',
  1: 'для 1 гостя',
  2: 'проживание до 2х гостей',
  3: 'проживание до 3х гостей'
};
const COMMERCIAL_ROOM = '100';
const NOT_FOR_GUESTS = '0';

const getErrorCapacity = () => {
  if (
    capacity.value === NOT_FOR_GUESTS &&
    rooms.value === COMMERCIAL_ROOM
  ) {
    return true;
  } else if (
    capacity.value <= rooms.value &&
    capacity.value !== NOT_FOR_GUESTS &&
    rooms.value !== COMMERCIAL_ROOM
  ) {
    return true;
  } else {
    return false;
  }
};
const getCapacityErrorMessage = () => CapactyErrorMessage[rooms.value];

pristine.addValidator(capacity, getErrorCapacity, getCapacityErrorMessage);

rooms.addEventListener('change', () => {
  pristine.validate(capacity);
});

//Валидация вьезда-выезда
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const changeAttribute = (change, value) => {
  const selected = change.querySelector('option[selected]');
  selected.removeAttribute('selected');
  const addSelected = change.querySelector(`option[value="${value}"]`);
  addSelected.setAttribute('selected', 'selected');
};

timeOut.addEventListener('change', () => {
  changeAttribute(timeIn, timeOut.value);
});
timeIn.addEventListener('change', () => {
  changeAttribute(timeOut, timeIn.value);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

changeFormStatus(false);

export { changeFormStatus, pristine };
