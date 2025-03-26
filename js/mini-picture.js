// Модуль отвечает за отрисовку публикации на главной странице

let miniPictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');


const getMiniPictures = (miniPicturesData, isFiltered) => {
  if (isFiltered) {
    miniPictures = document.querySelector('.pictures');
    const allPosts = miniPictures.querySelectorAll('.photos__mini');
    allPosts.forEach((post) => {post.remove()});
  }
miniPicturesData.forEach(({url, likes, comments}) => {
  const randomMiniature = template.cloneNode(true);
  randomMiniature.classList.add('photos__mini')
  randomMiniature.querySelector('.picture__img').src = url;
  randomMiniature.querySelector('.picture__likes').textContent = likes;
  randomMiniature.querySelector('.picture__comments').textContent = comments.length;
  miniPictures.appendChild(randomMiniature);
});
return miniPicturesData;
};

export {getMiniPictures};
