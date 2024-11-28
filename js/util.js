const ALERT_SHOW_TIME = 5000;

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const templateDataError = document.querySelector('#data-error').content;
  document.body.append(templateDataError);
  setTimeout(() => {
    document.body.querySelector('.data-error').remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomArrayElem, idGenerator, isEscapeKey, showAlert};
