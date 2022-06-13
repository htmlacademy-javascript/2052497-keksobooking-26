function getRandomNumber (min, max) {
  if (min >= 0 | max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Числа должны быть больше нуля и максимальное число должно быть больше';
}

getRandomNumber(5, 10);

function getFloatingPointNumber (min, max, count) {
  if (count > 20 | count < 0 ) {
    return 'Колтчество знаков после запятой должно быть от 0 до 20';
  } else if (min < 0 | max < min) {
    return 'Числа должны быть больше нуля и максимальное число должно быть больше';
  } else {
    return parseFloat((Math.random() * (max - min) + min).toFixed(count));
  }
}

getFloatingPointNumber(10, 15, 21);
