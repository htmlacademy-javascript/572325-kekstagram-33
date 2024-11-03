const getRandomNumber = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomArrayElem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

const idGenerator = () => {
  let idCounter = 0;
  return () => ++idCounter;
};

export {getRandomNumber, getRandomArrayElem, idGenerator};
