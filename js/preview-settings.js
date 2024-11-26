import {imgUploadOverlay, imgPreview} from './photo-upload.js';

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

//эффекты

const sliderElem = imgUploadOverlay.querySelector('.effect-level__slider');
const effectsRadioInputs = imgUploadOverlay.querySelectorAll('.effects__radio:not([value="none"])');

const EFFECTS_DATA = [
  ['grayscale', 0, 1, 0.1],
  ['sepia', 0, 1, 0.1],
  ['invert', 0, 100, 1, '%'],
  ['blur', 0, 3, 0.1, 'px'],
  ['brightness', 1, 3, 0.1]
];

noUiSlider.create(sliderElem, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

effectsRadioInputs.forEach((elem, i) => {
  elem.addEventListener('change', () => {
    sliderElem.noUiSlider.updateOptions({
      range: {
        min: EFFECTS_DATA[i][1],
        max: EFFECTS_DATA[i][2],
      },
      start: EFFECTS_DATA[i][1],
      step: EFFECTS_DATA[i][3],
    });
    sliderElem.noUiSlider.on('update', () => {
      elem.value = sliderElem.noUiSlider.get();
      const unit = (EFFECTS_DATA[i][4]) ? EFFECTS_DATA[i][4] : '';
      imgPreview.style.filter = `${EFFECTS_DATA[i][0]}(${elem.value}${unit})`;
    });
  });
});
