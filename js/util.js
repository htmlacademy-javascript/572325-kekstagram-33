const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const templateDataError = document.querySelector('#data-error').content;
  document.body.append(templateDataError);
  setTimeout(() => {
    document.body.querySelector('.data-error').remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, isEscapeKey, showAlert, debounce};
