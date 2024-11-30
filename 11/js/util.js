const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const templateDataError = document.querySelector('#data-error').content;
  document.body.append(templateDataError);
  setTimeout(() => {
    document.body.querySelector('.data-error').remove();
  }, ALERT_SHOW_TIME);
};

export {isEscapeKey, showAlert};
