// Модуль отвечает за открытие и закрытие формы публикации и редактора изображений

import {resetUploadEditor} from '/js/photos-editor.js'


const formPostOverlay = document.querySelector('.img-upload__overlay');
const uploadImageInput = document.querySelector('#upload-file');
const formPostCloser = formPostOverlay.querySelector('.img-upload__cancel');

const closeFormPostOverlay = function () {
  formPostOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImageInput.value = '';
  formPostCloser.removeEventListener('click',closeFormPostOverlay);
  document.removeEventListener('keydown', onEscCloseForm)
  resetUploadEditor(); // Сброс срабатывает только при событии change. Если закрывать фото на ESC параметры будут сбрасываться только при изменении фотографии
};

const onEscCloseForm = function (evt) {
  if(evt.key === 'Escape'){
    if (['hashtags', 'description'].includes(evt.target.name)){
      evt.stopPropagation();
    } else {
    closeFormPostOverlay();
    resetUploadEditor();
  }
  }
};

uploadImageInput.addEventListener('change', () => {
  formPostOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formPostCloser.addEventListener('click', closeFormPostOverlay)
  document.addEventListener('keydown',  onEscCloseForm)
})
