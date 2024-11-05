import {getPhotos} from './data.js';

const templateMiniPicture = document.querySelector('#picture').content;
const miniPicturesContainer = document.querySelector('.pictures');
const photosData = getPhotos();

photosData.forEach(({url, description, likes, comments}) => {
  const miniPictureItem = templateMiniPicture.querySelector('.picture').cloneNode(true);
  miniPictureItem.children[0].src = url;
  miniPictureItem.children[0].alt = description;
  miniPictureItem.querySelector('.picture__likes').textContent = likes;
  miniPictureItem.querySelector('.picture__comments').textContent = comments.length;
  miniPicturesContainer.append(miniPictureItem);
});
