// Модуль отвечает за показ и закрытие окна, информирующего о статусе отправке формы

const uploadImageForm = document.querySelector('#upload-select-image');
const editorsForm = document.querySelector('.img-upload__overlay')
const submitButton = uploadImageForm.querySelector('#upload-submit');


function showSuccessPostMessage () {
  const successPreTemplate = document.querySelector('#success').content
  const successTemplate = successPreTemplate.cloneNode(true);
  successTemplate.querySelector('.success').classList.add('response-popup');
  successTemplate.querySelector('.success__button').classList.add('close-popup');
  document.body.appendChild(successTemplate);
  resetEditor();
};

function showErrorPostMessage () {
  const errorPreTemplate = document.querySelector('#error').content;
  const errorTemplate = errorPreTemplate.cloneNode(true);
  errorTemplate.querySelector('.error').classList.add('response-popup');
  errorTemplate.querySelector('.error__button').classList.add('close-popup');
  document.body.appendChild(errorTemplate);
  resetEditor();
}

function resetEditor () {
  uploadImageForm.reset();
  editorsForm.classList.add('hidden');
  submitButton.disabled = false;
  setCloseHandlers();
}

function setCloseHandlers () {
  let okayButton = document.querySelector('.close-popup');
  okayButton.addEventListener('click', () => closePopup());
  document.body.addEventListener('keydown', onEscapeKey);
  document.body.addEventListener('click', onPopupClick);
}

function onEscapeKey (evt) {
  if (evt.key === 'Escape'){
    document.body.removeEventListener('keydown', onEscapeKey);
    closePopup();
  }
}

function onPopupClick (evt) {
  if (evt.target.classList.contains('response-popup')) {
    document.body.removeEventListener('click', onPopupClick);
    closePopup();
  }
}

function closePopup () {
  const popup = document.querySelector('.response-popup');
  popup.remove();
  document.body.classList.remove('modal-open');
}


export {showSuccessPostMessage, showErrorPostMessage};
