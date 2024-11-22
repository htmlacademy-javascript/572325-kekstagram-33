import {miniPicturesContainer} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const imgUploadInput = miniPicturesContainer.querySelector('#upload-file');
const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const imgEffectsPreview = imgUploadOverlay.querySelectorAll('.effects__preview');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const descriptionField = imgUploadForm.querySelector('.text__description');

const closeUploadModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
};

imgUploadOverlay.querySelector('#upload-cancel').addEventListener('click', closeUploadModal);

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event) && [hashtagInput, descriptionField].every((elem) => event.target !== elem)) {
    event.preventDefault();
    closeUploadModal();
  }
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgPreview.src = URL.createObjectURL(imgUploadInput.files[0]);
  imgEffectsPreview.forEach((v) => {
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
    uploadSubmitBtn.removeAttribute('disabled');
    return true;
  }
  uploadSubmitBtn.setAttribute('disabled', '');
  return false;
};

pristine.addValidator(hashtagInput, validateHashtags, () => pristineErrorMsg);
pristine.addValidator(descriptionField, (value) => value.length !== MAX_SYMBOLS_AMOUNT, `Максимальное количество символов - ${MAX_SYMBOLS_AMOUNT}`);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
