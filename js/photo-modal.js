import {miniPicturesContainer, photosData} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const bigPict = document.querySelector('.big-picture');
const loadCommentsBtn = bigPict.querySelector('.comments-loader');
const textSelectors = ['.likes-count', '.social__comment-total-count', '.social__comment-shown-count', '.social__caption'];
const queriedElements = textSelectors.map((v) => bigPict.querySelector(v));
const COMMENTS_LIMIT = 5;

const closePhotoModal = (callback) => {
  bigPict.classList.add('hidden');
  bigPict.querySelector('.social__comments').innerHTML = '';
  document.body.classList.remove('modal-open');
  loadCommentsBtn.classList.remove('hidden');
  loadCommentsBtn.removeEventListener('click', callback);
};
const closePhotoModalCallback = () => closePhotoModal(loadCommentsCallback);
bigPict.querySelector('#picture-cancel').addEventListener('click', closePhotoModalCallback);

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closePhotoModal();
  }
};

const hideCommentsLoader = (shown, total) => {
  if (shown === total) {
    loadCommentsBtn.classList.add('hidden');
  }
};

const renderComments = (count, photoObj, start = 0) => {
  for (let i = start; i < count; i++) {
    const insert = `<li class="social__comment"><img class="social__picture"
      src="${photoObj.comments[i].avatar}" alt="${photoObj.comments[i].name}" width="35" height="35">
    <p class="social__text">${photoObj.comments[i].message}</p></li>`;
    bigPict.querySelector('.social__comments').insertAdjacentHTML('beforeEnd', insert);
  }
};

const openPhotoModal = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    const target = evt.target.closest('.picture');
    bigPict.classList.remove('hidden');
    bigPict.querySelector('.big-picture__img img').src = target.href;
    const indexForSlice = target.href.lastIndexOf('/') + 1;
    const id = target.href.slice(indexForSlice, -4);
    const photo = photosData[id - 1];
    let commentShownCount = (photo.comments.length < COMMENTS_LIMIT) ? photo.comments.length : COMMENTS_LIMIT;
    hideCommentsLoader(commentShownCount, photo.comments.length);
    const photoData = [photo.likes, photo.comments.length, commentShownCount, photo.description];
    queriedElements.forEach((v, i) => {
      v.textContent = photoData[i];
    });
    renderComments(commentShownCount, photo);
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    const loadComments = (total, shown, photoObj, shownCountElem) => {
      if (total - shown >= COMMENTS_LIMIT) {
        shown += COMMENTS_LIMIT;
        renderComments(shown, photoObj, shown - COMMENTS_LIMIT);
      } else if (total > shown) {
        renderComments(total, photoObj, shown);
        shown = total;
      }
      shownCountElem.textContent = shown;
      hideCommentsLoader(shown, total);
      commentShownCount = shown;
      return commentShownCount;
    };
    const loadCommentsCallback = () => loadComments(photo.comments.length, commentShownCount, photo, queriedElements[2]);
    loadCommentsBtn.addEventListener('click', loadCommentsCallback);
  }
};

miniPicturesContainer.addEventListener('click', openPhotoModal);

// function closePhotoModal () {
//   bigPict.classList.add('hidden');
//   bigPict.querySelector('.social__comments').innerHTML = '';
//   document.body.classList.remove('modal-open');
//   loadCommentsBtn.classList.remove('hidden');
//   loadCommentsBtn.removeEventListener('click', loadCommentsCallback);
//   bigPict.querySelector('#picture-cancel').removeEventListener('click', closePhotoModal);
//   document.removeEventListener('keydown', onDocumentKeydown);
// }
