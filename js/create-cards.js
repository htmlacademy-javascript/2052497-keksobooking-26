const template = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const generateCards = function (houses) {
  const houseCard = template.cloneNode(true);
  houses.forEach(({author, offer}) => {
    houseCard.querySelector('.popup__title').textContent = offer.title;
    houseCard.querySelector('.popup__text--address').textContent = offer.address;
    houseCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    houseCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    houseCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    houseCard.querySelector('.popup__description').textContent = offer.description;
    houseCard.querySelector('.popup__avatar').src = author.avatar;

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
    featuresList.forEach((featureList) => {
      const isNecessary = offer.features.some(
        (feature) => featureList.classList.contains(`popup__feature--${feature}`)
      );
      if (isNecessary) {
        featureList.remove();
      }
    });

    const houseImageList = houseCard.querySelector('.popup__photos');
    const houseImage = houseCard.querySelector('.popup__photo');
    const imageTemplate = houseImage.cloneNode(true);
    houseImageList.innerHTML = '';
    for (let i = 0; i < offer.photos.length; i++) {
      const imageCode = imageTemplate.cloneNode(true);
      imageCode.src = offer.photos[i];
      houseImageList.appendChild(imageCode);
    }

    mapCanvas.appendChild(houseCard);
  });
};

export {generateCards};
