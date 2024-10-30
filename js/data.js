import {getRandomNumber, getRandomArrayElem} from './util.js';

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const USER_NAMES = ['Леонид', 'Рамиль', 'Артём', 'Иван', 'Родион', 'Николай', 'Алексей', 'Богдан'];
const PHOTOS_COUNT = 25;

let idCounter = 0;
const commentsUsedIds = [];

const getComment = () => {
  let commentId = Math.random();
  while (commentsUsedIds.includes(commentId)) {
    commentId = Math.random();
  }
  commentsUsedIds.push(commentId);
  return {
    id: (commentId * 1000).toFixed(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElem(COMMENT_MESSAGES),
    name: getRandomArrayElem(USER_NAMES)
  };
};

const createPhotoItem = () => ({
  id: ++idCounter,
  url: `photos/${idCounter}.jpg`,
  description: 'Здесь должно быть описание',
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 30)}, getComment)
});

const getPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhotoItem);

export {getPhotos};
