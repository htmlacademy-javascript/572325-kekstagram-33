import {imgUploadOverlay, imgPreview, imgEffectsPreview} from './photo-upload.js';

// настройки масштаба

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
let currentScaleValue = Number(scaleControlValue.value.slice(0, -1));
const scaleButtons = ['.scale__control--smaller', '.scale__control--bigger'].map((elem) => imgUploadOverlay.querySelector(elem));

const changeScale = (evt) => {
  if (evt.target === scaleButtons[0] && currentScaleValue > MIN_SCALE_VALUE) {
    currentScaleValue -= SCALE_STEP;
  } else if (evt.target === scaleButtons[1] && currentScaleValue < MAX_SCALE_VALUE) {
    currentScaleValue += SCALE_STEP;
  }
  imgPreview.style.transform = `scale(${currentScaleValue / 100})`;
  scaleControlValue.value = `${currentScaleValue}%`;
};

scaleButtons.forEach((elem) => elem.addEventListener('click', changeScale));
