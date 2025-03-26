// Модуль отвечает за отрисовку окна публикации и блока комментариев

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel')
const miniPictures = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let currentHideHandler = null;


// Обработчик закрытия большого фото кнопкой "Закрыть"
bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', currentHideHandler);
});

function escapeHandler (evt) {
  if(evt.key === 'Escape')
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escapeHandler);
    commentsLoader.removeEventListener('click', currentHideHandler);
}

// Создание блока комментариев для полноразмерного фото
const renderCommentsSection = (comments) => {
    const commentsSection = document.querySelector('.social__comments');
    commentsSection.innerHTML = '';
    const commentTemplate = document.querySelector('#comment').content

    comments.forEach(({avatar, name, message}) => {
        const commentOfSection = commentTemplate.cloneNode(true);
        commentOfSection.querySelector('img').src = avatar;
        commentOfSection.querySelector('img').alt = name;
        commentOfSection.querySelector('p').textContent = message;
        commentsSection.appendChild(commentOfSection);
    })
};

// Создания окна с полноразмерным фото
const renderBigPhoto = ({url, likes, comments, description}) => {
    const bigPhotoSrc = bigPicture.querySelector('.big-picture__img').children[0];
    const bigPhotoLikes = bigPicture.querySelector('.likes-count');
    const bigPhotoDescription = bigPicture.querySelector('.social__caption');
    renderCommentsSection(comments);
    bigPhotoSrc.src = url;
    bigPhotoLikes.textContent = likes;
    bigPhotoDescription.textContent = description;
    commentsLoader.classList.remove('hidden');

}

// Функция скрытия и раскрытия комментариев
const hideComments = function () {
  const commentsToHidden = document.querySelectorAll('.social__comment')
  let hiddenIndex = -1;

  return () => {
  hiddenIndex+=5;
    commentsToHidden.forEach((comment, index) => {
      if (index > hiddenIndex) {
        comment.classList.add('hidden')
      }
      if (index <= hiddenIndex) {
        comment.classList.remove('hidden')
        // Счётчик раскрытых комментариев
        const commentCount = bigPicture.querySelector('.social__comment-count');
        commentCount.textContent = `${index+1} из ${commentsToHidden.length} комментариев`
      }
    })
    if (commentsToHidden.length <= hiddenIndex) {
      commentsLoader.classList.add('hidden');
    }
  }
};

// Обработчик клика по миниатюрам
const addMiniPictureHandlers = (allMiniPictures) => {
const miniPhotos = miniPictures.querySelectorAll('.photos__mini');

for (let i = 0; i < miniPhotos.length; i++) {
    miniPhotos[i].addEventListener('click', () => {
        // Обработчик закрытия большого фото клавишей Esc
        document.addEventListener('keydown', escapeHandler);

        const miniPhotoInfo = allMiniPictures[i];
        renderBigPhoto(miniPhotoInfo);
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        // Скрывает или расскрывает комментарий в зависимости от того больше или меньше порогового значения его индекс
        if (currentHideHandler) {
          commentsLoader.removeEventListener('click', currentHideHandler);
        }
        const hide = hideComments();
        hide()
        currentHideHandler = hide;
        commentsLoader.addEventListener('click', currentHideHandler);
    })
};
};

export {addMiniPictureHandlers};
