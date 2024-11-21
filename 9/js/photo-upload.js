import {miniPicturesContainer} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const imgUploadForm = document.querySelector('#upload-select-image');
const imgUploadInput = miniPicturesContainer.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const imgEffectsPreview = imgUploadOverlay.querySelectorAll('.effects__preview');

const closeUploadModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

imgUploadOverlay.querySelector('#upload-cancel').addEventListener('click', closeUploadModal);

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
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

const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const uploadSubmitBtn = imgUploadForm.querySelector('#upload-submit');
const MAX_HASHTAG_AMOUNT = 5;
let pristineErrorMsg;

const isHashtagValid = (array) => array.every((hashtag) => {
  pristineErrorMsg = 'Невалидный хэштег';
  return regexp.test(hashtag);
});

const isHashtagDuplicate = (array) => !array.every((hashtag, i) => {
  pristineErrorMsg = 'Хэштеги не должны повторяться';
  return array.includes(hashtag, i + 1);
});

const validateHashtags = (value) => {
  const hashtags = value.split(' ');
  console.log(isHashtagDuplicate(hashtags));
  if (isHashtagValid(hashtags) && isHashtagDuplicate(hashtags)) {
    uploadSubmitBtn.removeAttribute('disabled');
    return true;
  }
  uploadSubmitBtn.setAttribute('disabled', '');
  return false;
};

pristine.addValidator(hashtagInput, validateHashtags, () => pristineErrorMsg);

// const isHashtagValid = (hashtag) => regexp.test(hashtag);
// const isHashtagDuplicate = (hashtags) =>
// const validateHashtags = (callback, hashtags) => {
//   hashtags.split(' ').forEach((hashtag) => {
//     if (callback(hashtag)) {
//       uploadSubmitBtn.removeAttribute('disabled');
//       return true;
//     }
//     console.log(callback(hashtag));
//     uploadSubmitBtn.setAttribute('disabled', '');
//     return false;
//   });
// };

// pristine.addValidator(hashtagInput, (value) => {
//   validateHashtags(regexp.test, value);
// }, 'Введён невалидный хэштег');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }
});
