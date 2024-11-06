import {miniPicturesContainer, photosData} from './thumbnails.js';

const bigPict = document.querySelector('.big-picture');

const closePhotoModal = () => {
  bigPict.classList.add('hidden');
  bigPict.querySelector('.social__comments').innerHTML = '';
  document.body.classList.remove('modal-open');
};

const openPhotoModal = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    const target = evt.target.closest('.picture');
    bigPict.classList.remove('hidden');
    bigPict.querySelector('.big-picture__img img').src = target.href;
    bigPict.querySelector('.likes-count').textContent = target.querySelector('.picture__likes').textContent;
    const commentTotalCount = target.querySelector('.picture__comments').textContent;
    bigPict.querySelector('.social__comment-total-count').textContent = commentTotalCount;
    const commentShownCount = (commentTotalCount < 5) ? commentTotalCount : 5;
    bigPict.querySelector('.social__comment-shown-count').textContent = commentShownCount;
    const indexForSlice = target.href.lastIndexOf('/');
    const id = target.href.slice(indexForSlice + 1, -4);
    for (let i = 0; i < commentShownCount; i++) {
      const insert = `<li class="social__comment"><img class="social__picture"
        src="${photosData[id].comments[i].avatar}"
        alt="${photosData[id].comments[i].name}" width="35" height="35">
      <p class="social__text">${photosData[id].comments[i].message}</p></li>`;
      bigPict.querySelector('.social__comments').insertAdjacentHTML('afterBegin', insert);
    }
    bigPict.querySelector('.social__caption').textContent = target.querySelector('.picture__img').alt;
    document.body.classList.add('modal-open');
    bigPict.querySelector('#picture-cancel').addEventListener('click', closePhotoModal);
  }
};

miniPicturesContainer.addEventListener('click', openPhotoModal);
