// Модуль отвечает за валидацию формы публикации

import {sendPhotoFormRequest} from '/js/http-service.js';
import {resetUploadEditor} from '/js/photos-editor.js'

const editorForm = document.querySelector('#upload-select-image');
const hashtagsInput = editorForm.querySelector('[name="hashtags"]');
const commentInput = editorForm.querySelector('[name="description"]');
const submitButton = editorForm.querySelector('#upload-submit');


const formValidation = new Pristine (editorForm, {
  classTo : 'validation__result',
  errorClass : 'invalid__item',
  successClass : 'valid__item',
  errorTextParent : 'validation__result',
  errorTextTag : 'span',
  errorTextClass : 'error__text',
}, false);

// Преформатирование хештегов
const normalizeHashtags = function () {
  hashtagsInput.value = hashtagsInput.value
  .split(/\s+/)
  .filter(tag => tag !== "")
  .map(tag => tag.startsWith('#')? tag : `#${tag}`)
  .join("")
  .replace(/#/g, " #")
  .trim();
};

// Валидация комментария
const validateComment = function (comment) {
  return comment.length <= 140;
};

// Валидация хештегов
function validateTags (value) {
  if (value.length === 0 ) {return true} // Пустое значение валидно, хештеги не обязательны

  const tags = value.split(/\s+/);
  const uniTags = tags.map(tag => tag.toLowerCase());

if (tags.length <= 5){
  if (tags.length === new Set(uniTags).size) {
    return tags.every(tag => /^#[a-zA-Zа-яА-Я0-9]{1,19}$/.test(tag))
}
return false
}
};

// Генератор текста ошибки хештега
function getHashtagErrorText (value) {
  const tags = value.split(/\s+/);
  const uniTags = tags.map(tag => tag.toLowerCase());
  let errorText = '';

  if (tags.length > 5) {errorText = `</br>Можно указать не более 5 хештегов!`}
  if (tags.length !== new Set(uniTags).size) {errorText += errorText.endsWith('!') ? '</br>Также нельзя указывать одинаковые хештеги!' : '</br>Нельзя указывать одинаковые хештеги!'}
  if (tags.every(tag => /^#[a-zA-Zа-яА-Я0-9]{1,19}$/.test(tag)) === false) {errorText += errorText.endsWith('!') ? '</br>А также тег не должен содержать спец.символы, и должен содержать от 1 до 19 знаков!' : '</br>Тег не должен содержать спец.символы, и должен содержать от 1 до 19 знаков!'}
  return errorText;
};

hashtagsInput.addEventListener('blur', normalizeHashtags);

// Валидатор хештегов
formValidation.addValidator (hashtagsInput, validateTags, getHashtagErrorText);

// Валидатор комментария
formValidation.addValidator (commentInput, validateComment, '</br>Макс.длина комментария 140 символов!')

editorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!formValidation.validate()) {
    return;
  }
  submitButton.disabled = true;
  sendPhotoFormRequest();
  resetUploadEditor();
});





