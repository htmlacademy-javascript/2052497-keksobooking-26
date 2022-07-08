// Генератор случайного целого чисела
export function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//Генеротор случайного числа с плавающей точкой
export function getRandomPositiveFloat(a, b, digits = 5) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

//Получаем случайное значение из массива
export const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Получаем несколько случайных значений массива
export function getSomeRandomValue(elements) {
  const randomElements = [];
  const countValue = getRandomPositiveInteger(1, elements.length);
  let value;
  while (randomElements.length < countValue) {
    value = getRandomArrayElement(elements);
    if (!randomElements.includes(value)) {
      randomElements.push(value);
    }
  }
  return randomElements;
}