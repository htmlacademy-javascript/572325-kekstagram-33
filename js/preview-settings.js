import {imgUploadOverlay, imgPreview} from './photo-upload.js';

// настройки масштаба

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
const scaleButtons = ['.scale__control--smaller', '.scale__control--bigger'].map((elem) => imgUploadOverlay.querySelector(elem));

const changeScale = (evt) => {
  let currentScaleValue = Number(scaleControlValue.value.slice(0, -1));
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

const sliderInput = imgUploadOverlay.querySelector('.effect-level__value');
const sliderElem = imgUploadOverlay.querySelector('.effect-level__slider');
const effectsRadioInputs = imgUploadOverlay.querySelectorAll('.effects__radio:not([value="none"])');

const EFFECTS_DATA = {
  effectNames: ['grayscale', 'sepia', 'invert', 'blur', 'brightness'],
  minValues: [0, 0, 0, 0, 1],
  maxValues: [1, 1, 100, 3, 3],
  steps: [0.1, 0.1, 1, 0.1, 0.1],
  units: ['', '', '%', 'px', '']
};

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
        min: EFFECTS_DATA.minValues[i],
        max: EFFECTS_DATA.maxValues[i],
      },
      start: EFFECTS_DATA.minValues[i],
      step: EFFECTS_DATA.steps[i],
    });
    sliderElem.noUiSlider.on('update', () => {
      sliderInput.value = sliderElem.noUiSlider.get();
      imgPreview.style.filter = `${EFFECTS_DATA.effectNames[i]}(${sliderInput.value}${EFFECTS_DATA.units[i]})`;
    });
  });
});
