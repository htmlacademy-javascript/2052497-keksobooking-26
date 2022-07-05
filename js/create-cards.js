import { createElements } from './create-elements.js';
const template = document.querySelector('#card').content.querySelector('.popup');
const houses = createElements();
const mapCanvas = document.querySelector('.map__canvas');

const generateCards = function () {
  const houseCard = template.cloneNode(true);
  houses.forEach(({author, offer}) => {
    houseCard.querySelector('.popup__title').textContent = offer.title;
    houseCard.querySelector('.popup__text--address').textContent = offer.address;
    houseCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    houseCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    houseCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    houseCard.querySelector('.popup__description').textContent = offer.description;
    houseCard.querySelector('.popup__avatar').src = author.avatar;
    let type;
    switch(offer.type) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalow':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
      case 'hotel':
        type = 'Отель';
        break;
    }
    houseCard.querySelector('.popup__type').textContent = type;

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
