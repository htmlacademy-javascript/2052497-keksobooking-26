//status = булевые значения
const changeFormStatus = (status) => {
  const adForm = document.querySelector('.ad-form');
  const mapFilters = document.querySelector('.map__filters');
  if (!status) {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  } else {
    adForm.classList.remove('.ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
};
export {changeFormStatus};
