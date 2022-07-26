const template = document.querySelector('#card').content.querySelector('.popup');

const generateCards = function (author, offer) {
  const houseCard = template.cloneNode(true);
  houseCard.querySelector('.popup__title').textContent = offer.title;
  houseCard.querySelector('.popup__text--address').textContent = offer.address;
  houseCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  houseCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  houseCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.description) {
    houseCard.querySelector('.popup__description').textContent = offer.description;
  } else {
    houseCard.querySelector('.popup__description').setAttribute('hidden', 'hidden');
  }

  if (author.avatar) {
    houseCard.querySelector('.popup__avatar').src = author.avatar;
  }

  const HouseType = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };
  houseCard.querySelector('.popup__type').textContent = HouseType[offer.type];

  const featuresContainer = houseCard.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (offer.features) {
    featuresList.forEach((featureList) => {
      const isNecessary = offer.features.some(
        (feature) => featureList.classList.contains(`popup__feature--${feature}`)
      );
      if (isNecessary) {
        featureList.remove();
      }
    });
  } else {
    featuresContainer.setAttribute('hidden', 'hidden');
  }

  const houseImageList = houseCard.querySelector('.popup__photos');
  const houseImage = houseCard.querySelector('.popup__photo');
  const imageTemplate = houseImage.cloneNode(true);
  houseImageList.innerHTML = '';
  if (offer.photos) {
    for (let i = 0; i < offer.photos.length; i++) {
      const imageCode = imageTemplate.cloneNode(true);
      imageCode.src = offer.photos[i];
      houseImageList.appendChild(imageCode);
    }
  }
  return houseCard;
};

export { generateCards };
