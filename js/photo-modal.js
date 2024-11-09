import {miniPicturesContainer, photosData} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const bigPict = document.querySelector('.big-picture');
const COMMENTS_LIMIT = 5;

const closePhotoModal = () => {
  bigPict.classList.add('hidden');
  bigPict.querySelector('.social__comments').innerHTML = '';
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const openPhotoModal = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    const target = evt.target.closest('.picture');
    bigPict.classList.remove('hidden');
    bigPict.querySelector('.big-picture__img img').src = target.href;
    const textSelectors = ['.likes-count', '.social__comment-total-count', '.social__comment-shown-count', '.social__caption'];
    const queriedElements = textSelectors.map((v) => bigPict.querySelector(v));
    const indexForSlice = target.href.lastIndexOf('/') + 1;
    const id = target.href.slice(indexForSlice, -4);
    const photo = photosData[id - 1];
    const commentShownCount = (photo.comments.length < COMMENTS_LIMIT) ? photo.comments.length : COMMENTS_LIMIT;
    const photoValues = [photo.likes, photo.comments.length, commentShownCount, photo.description];
    queriedElements.forEach((v, i) => {
      v.textContent = photoValues[i];
    });
    for (let i = 0; i < commentShownCount; i++) {
      const insert = `<li class="social__comment"><img class="social__picture"
        src="${photo.comments[i].avatar}" alt="${photo.comments[i].name}" width="35" height="35">
      <p class="social__text">${photo.comments[i].message}</p></li>`;
      bigPict.querySelector('.social__comments').insertAdjacentHTML('afterBegin', insert);
    }
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

bigPict.querySelector('#picture-cancel').addEventListener('click', closePhotoModal);
miniPicturesContainer.addEventListener('click', openPhotoModal);
