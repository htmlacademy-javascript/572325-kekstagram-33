import {getData} from './network.js';
import {showAlert} from './util.js';

const templateMiniPicture = document.querySelector('#picture').content;
const miniPicturesContainer = document.querySelector('.pictures');
let photosData;
//const PHOTOS_COUNT = 25;

const renderThumbnails = (data) => {
  photosData = data;
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

getData().then((photosArray) => {
  renderThumbnails(photosArray);
}).catch(() => {
  showAlert();
});

export {miniPicturesContainer, photosData};
