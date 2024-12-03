import {miniPicturesContainer} from './thumbnails.js';
import {isEscapeKey} from './util.js';
import {sendData} from './network.js';

const imgUploadInput = miniPicturesContainer.querySelector('#upload-file');
const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const imgPreviewEffects = imgUploadOverlay.querySelectorAll('.effects__preview');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const descriptionField = imgUploadForm.querySelector('.text__description');
let messageElem;

const closeUploadModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  imgPreview.style.transform = 'scale(1)';
  imgPreview.style.filter = 'none';
};

imgUploadOverlay.querySelector('#upload-cancel').addEventListener('click', closeUploadModal);

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event) && [hashtagInput, descriptionField].every((elem) => event.target !== elem) && !messageElem) {
    event.preventDefault();
    closeUploadModal();
  }
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgPreview.src = URL.createObjectURL(imgUploadInput.files[0]);
  imgPreviewEffects.forEach((v) => {
    v.style.backgroundImage = `url(${imgPreview.src})`;
  });
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadInput.addEventListener('change', openUploadModal);

//валидация формы

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadSubmitBtn = imgUploadForm.querySelector('#upload-submit');
const MAX_HASHTAG_AMOUNT = 5;
const MAX_SYMBOLS_AMOUNT = 140;
let pristineErrorMsg;

const isHashtagValid = (array) => {
  pristineErrorMsg = 'Невалидный хэштег';
  return array.every((hashtag) => regexp.test(hashtag));
};

const isHashtagDuplicate = (array) => {
  pristineErrorMsg = 'Хэштеги не должны повторяться';
  return array.filter((hashtag, i) => array.indexOf(hashtag) !== i).length;
};

const isAllowedHashtagsAmount = (array) => {
  pristineErrorMsg = 'Количество хэштегов превышает допустимое';
  return array.length <= MAX_HASHTAG_AMOUNT;
};

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ');
  if (!hashtags[0] || (isHashtagValid(hashtags) && !isHashtagDuplicate(hashtags) && isAllowedHashtagsAmount(hashtags))) {
    uploadSubmitBtn.disabled = false;
    return true;
  }
  uploadSubmitBtn.disabled = true;
  return false;
};

pristine.addValidator(hashtagInput, validateHashtags, () => pristineErrorMsg);
pristine.addValidator(descriptionField, (value) => value.length !== MAX_SYMBOLS_AMOUNT, `Максимальное количество символов - ${MAX_SYMBOLS_AMOUNT}`);

const onMessageEscape = (e) => {
  if (isEscapeKey(e)) {
    e.preventDefault();
    messageElem.remove();
    messageElem = '';
  }
};

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  messageElem = template.querySelector(`.${type}`).cloneNode(true);
  document.body.append(messageElem);
  const messageBtn = messageElem.querySelector(`.${type}__button`);
  messageElem.addEventListener('click', (event) => {
    if (event.target === messageElem || event.target === messageBtn) {
      messageElem.remove();
    }
  });
  document.addEventListener('keydown', onMessageEscape);
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  uploadSubmitBtn.disabled = true;
  sendData(formData).then(closeUploadModal).then(() => showMessage('success')).catch(() => {
    showMessage('error');
  }).finally(() => {
    uploadSubmitBtn.disabled = false;
  });
});

export{imgUploadOverlay, imgPreview, imgPreviewEffects};
