// Модуль отвечает за взаимодействие с сервером

import {getMiniPictures} from './mini-picture.js';
import {addMiniPictureHandlers} from './big-picture.js';
import {showSuccessPostMessage, showErrorPostMessage} from './http-service-popup.js';
import {showPostsFilter} from './posts-filter.js';


fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
.then((response) => {
  console.log('Ответ по запросу GET : ' + response)
  if (response.ok)
{
  return response.json()
} else {
  throw new Error (response.status);
}})
.then((pictures) => {
  const allMiniPictures = getMiniPictures(pictures);
  addMiniPictureHandlers(allMiniPictures);
  return pictures;
})
.then((pictures) => {
  showPostsFilter(pictures);
})
.catch((error) => {
  console.log(error)
  showErrorLogo(error);
});

function showErrorLogo(errorBody) {
  const logoBackground = document.querySelector('#upload-select-image');
  const errorWindow = document.querySelector('.img-upload__label');
  const successWindow = document.querySelector('.img-upload__label-span');
  document.querySelector('#upload-file').disabled = true;
  document.querySelector('.img-upload__label').style.cursor = 'default';
  successWindow.style.display = 'none';
  const newErrorWindow = document.createElement('span');
  newErrorWindow.classList.add('img-upload__error');
  newErrorWindow.textContent =errorBody;
  errorWindow.appendChild(newErrorWindow);
  logoBackground.classList.add('img-upload__form__error');
}

const sendPhotoFormRequest = () => {
  const photoForm = document.querySelector('#upload-select-image');
  const formData = new FormData(photoForm);
fetch (' https://25.javascript.htmlacademy.pro/kekstagram',
  {
    method : 'POST',
    body: formData ,
  }
)
.then((response) => {
  if (response.ok) {
    showSuccessPostMessage();
  console.log(response.status); // Удалить
  return response.json();
  };
  throw new Error (response.status)
})
.then((data) => {
  console.log('Результат:', data);
})
.catch((error) => {
  showErrorPostMessage();
  console.log(error);
})
};

export {sendPhotoFormRequest};
