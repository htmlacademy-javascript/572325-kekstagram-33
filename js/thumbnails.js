import {getData} from './network.js';
import {getRandomNumber, showAlert, debounce} from './util.js';

const templateMiniPicture = document.querySelector('#picture').content;
const miniPicturesContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const imgFilterButtons = imgFilters.querySelectorAll('.img-filters__button');
const RANDOM_PHOTOS_AMOUNT = 10;
const RERENDER_DELAY = 500;

const renderThumbnails = (data) => {
  data.forEach(({url, description, likes, comments}) => {
    const miniPictureItem = templateMiniPicture.querySelector('.picture').cloneNode(true);
    if (miniPictureItem.children.length > 0) {
      miniPictureItem.href = url;
      miniPictureItem.children[0].src = url;
      miniPictureItem.children[0].alt = description;
      miniPictureItem.querySelector('.picture__likes').textContent = likes;
      miniPictureItem.querySelector('.picture__comments').textContent = comments.length;
      miniPicturesContainer.append(miniPictureItem);
    }
  });
};

const getRandomPhotos = (response) => {
  const randomPhotos = [];
  while (randomPhotos.length < RANDOM_PHOTOS_AMOUNT) {
    const randomIndex = getRandomNumber(0, response.length - 1);
    randomPhotos.push(response[randomIndex]);
    response.splice(randomIndex, 1);
  }
  return randomPhotos;
};

const compareCommentsAmount = (objectA, objectB) => objectB.comments.length - objectA.comments.length;

const getSortedByComments = (response) => response.sort(compareCommentsAmount);

const photosData = await getData().then((photosArray) => {
  renderThumbnails(photosArray);
  imgFilters.classList.remove('img-filters--inactive');
  let activeImgFilter = imgFilters.querySelector('.img-filters__button--active');
  let arrayToRender;
  const callDebounce = debounce(() => {
    miniPicturesContainer.querySelectorAll('.picture').forEach((elem) => {
      elem.remove();
    });
    renderThumbnails(arrayToRender);
  }, RERENDER_DELAY);
  imgFilterButtons.forEach((btn) => btn.addEventListener('click', () => {
    activeImgFilter.classList.remove('img-filters__button--active');
    btn.classList.add('img-filters__button--active');
    activeImgFilter = btn;
    arrayToRender = photosArray;
    if (btn.id.endsWith('random')) {
      arrayToRender = getRandomPhotos(photosArray.slice());
    }
    if (btn.id.endsWith('discussed')) {
      arrayToRender = getSortedByComments(photosArray.slice());
    }
    callDebounce();
  }));
  return photosArray;
}).catch(() => {
  showAlert();
});

export {miniPicturesContainer, photosData};
