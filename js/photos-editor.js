// Модуль отвечает за функцию редактирование изображений

const scaleControl = document.querySelector('.scale__control--value');
const scaleControlPanel = document.querySelector('.img-upload__scale');
const photoPreview = document.querySelector('.img-preview');
const slider = document.querySelector('.effect-level__slider')
const sliderContainer = document.querySelector('.img-upload__effect-level');
const imageUploadForm = document.querySelector('#upload-select-image');


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  }
});

let scale = 100;

const effectsList = document.querySelector('.effects__list');

// Основной эффект фильтра
const effectsOptions = {
  none : '',
  chrome : 'grayscale',
  sepia : 'sepia',
  marvin : 'invert',
  phobos : 'blur',
  heat : 'brightness'
}

// Настройки слайдера, соответствующие выбранному фильтру
const sliderOptions = {
  none : {
    range : {min: 0, max : 1}, start : 1, step : 0.1},
  chrome : {
    range : {min: 0, max : 1}, start : 1, step : 0.1},
  sepia : {
    range : {min: 0, max : 1}, start : 1, step : 0.1},
  marvin : {
    range : {min: 0, max : 100}, start : 100, step : 1},
  phobos : {
    range : {min: 0, max : 3}, start : 3, step : 0.1},
  heat : {
    range : {min: 1, max : 3}, start : 3, step : 0.1},
  }

// Изменение размера изображения
scaleControlPanel.addEventListener('click', (evt) => {
  changeScale(evt);
})

function changeScale (evt) {
  if(evt.target.matches('.scale__control--smaller') && scaleControl.value !== '25%'){
    scaleControl.value = `${scale-=25}%`;
  }
  if(evt.target.matches('.scale__control--bigger') && scaleControl.value !== '100%'){
    scaleControl.value = `${scale+=25}%`;
  }
  photoPreview.style.transform = `scale(${scale/100})`;
}

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  tooltips: true,
  pips: true
})

// Изменение фильтров и их насыщенности
effectsList.addEventListener('change', (evt) => {
updateCurrentFilter(evt);
})

function updateCurrentFilter (evt) {
 const allEffects = document.querySelectorAll('.effects__radio');
 let currentEffect = 'none';
 photoPreview.style.filter = '';

// Изменение фильтров
if (evt) {
  currentEffect = evt.target.value;
}
 allEffects.forEach((effect) => {
  if (effect.value !== currentEffect) {
    photoPreview.classList.remove(`effects__preview--${effect.value}`);
  }
 })
  photoPreview.classList.add(`effects__preview--${currentEffect}`);
  sliderContainer.classList.remove('hidden');

  if(currentEffect === 'none'){
    sliderContainer.classList.add('hidden');
  }

// Обновление параметров слайдера
  slider.noUiSlider.updateOptions(
    sliderOptions[currentEffect]
  )

// Настройка насыщенности фильтра в зависимости от положения слайдера
  slider.noUiSlider.on('update', () => {
    const effectInput = document.querySelector('.effect-level__value');
    photoPreview.style.filter = '';
    let specialSign = '';
    effectInput.value = slider.noUiSlider.get()
    currentEffect.includes('marvin') ? specialSign = '%': false;
    currentEffect.includes('phobos') ? specialSign = 'px': false;
    photoPreview.style.filter = `${effectsOptions[currentEffect]}(${effectInput.value}${specialSign})`
  })
}

function resetUploadEditor () {
  imageUploadForm.reset();
  scale = 100;
  scaleControl.value = `${scale}%`;
  photoPreview.style.transform = `scale(${scale/100})`;
  updateCurrentFilter();
}

export {resetUploadEditor};
