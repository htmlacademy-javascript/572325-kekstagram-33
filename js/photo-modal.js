import {miniPicturesContainer, photosData} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const bigPict = document.querySelector('.big-picture');
const loadCommentsBtn = bigPict.querySelector('.comments-loader');
const textSelectors = ['.likes-count', '.social__comment-total-count', '.social__comment-shown-count', '.social__caption'];
const queriedElements = textSelectors.map((v) => bigPict.querySelector(v));
const COMMENTS_LIMIT = 5;
let commentShownCount, photoObj, comments;

const closePhotoModal = () => {
  bigPict.classList.add('hidden');
  bigPict.querySelector('.social__comments').innerHTML = '';
  document.body.classList.remove('modal-open');
  loadCommentsBtn.classList.remove('hidden');
};

bigPict.querySelector('#picture-cancel').addEventListener('click', closePhotoModal);

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closePhotoModal();
  }
};

const hideCommentsLoader = () => {
  if (commentShownCount === comments.length) {
    loadCommentsBtn.classList.add('hidden');
  }
};

const renderComments = (count, start = 0) => {
  for (let i = start; i < count; i++) {
    const insert = `<li class="social__comment"><img class="social__picture"
      src="${comments[i].avatar}" alt="${comments[i].name}" width="35" height="35">
    <p class="social__text">${comments[i].message}</p></li>`;
    bigPict.querySelector('.social__comments').insertAdjacentHTML('beforeEnd', insert);
  }
};

const loadComments = () => {
  if (comments.length - commentShownCount >= COMMENTS_LIMIT) {
    commentShownCount += COMMENTS_LIMIT;
    renderComments(commentShownCount, commentShownCount - COMMENTS_LIMIT);
  } else if (comments.length > commentShownCount) {
    renderComments(comments.length, commentShownCount);
    commentShownCount = comments.length;
  }
  queriedElements[2].textContent = commentShownCount;
  hideCommentsLoader();
};

const openPhotoModal = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const target = evt.target.closest('.picture');
    bigPict.classList.remove('hidden');
    const indexForSlice = target.href.lastIndexOf('/') + 1;
    const id = target.href.slice(indexForSlice, -4);
    photoObj = photosData[id - 1];
    bigPict.querySelector('.big-picture__img img').src = photoObj.url;
    comments = photoObj.comments;
    commentShownCount = (comments.length < COMMENTS_LIMIT) ? comments.length : COMMENTS_LIMIT;
    hideCommentsLoader();
    const photoData = [photoObj.likes, comments.length, commentShownCount, photoObj.description];
    queriedElements.forEach((v, i) => {
      v.textContent = photoData[i];
    });
    renderComments(commentShownCount);
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

loadCommentsBtn.addEventListener('click', loadComments);
miniPicturesContainer.addEventListener('click', openPhotoModal);
