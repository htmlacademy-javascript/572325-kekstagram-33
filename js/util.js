const getRandomNumber = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomArrayElem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

export {getRandomNumber, getRandomArrayElem};
