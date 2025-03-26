// Этот модуль содержит код фильтрации опубликованных постов

import {getMiniPictures} from '/js/mini-picture.js';
import {addMiniPictureHandlers} from '/js/big-picture.js';


function showPostsFilter (pictures) {
  const filterBlock = document.querySelector('.img-filters');
  filterBlock.classList.remove('img-filters--inactive');
  addPostsFilterHandler(filterBlock, pictures);
}

function addPostsFilterHandler (filterBlock, pictures) {
  const debouncedHandler = debounceCallback((evt) => executeHandler(evt, pictures));
  filterBlock.addEventListener('click', (evt) => {debouncedHandler(evt),activateFilterButton(evt)});
}

function debounceCallback (callback, timeoutDelay = 500) {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback.apply(this, rest), timeoutDelay);  }
}

function executeHandler (evt, pictures) {
  if (evt.target.id === 'filter-default') {
    getMiniPictures(pictures, 'filter');
    addMiniPictureHandlers(pictures);
    return;
  }
  if (evt.target.id === 'filter-random') {
    const picturesID = pictures.map(p => p.id);
    const shuffled = picturesID.sort(() => 0.5 - Math.random());
    const randomPostsID = shuffled.slice(0, 10);
    const randomPosts = pictures.filter((picture) =>randomPostsID.includes(picture.id));
    getMiniPictures(randomPosts, 'filter');
    addMiniPictureHandlers(randomPosts);
    return;
  }
  if (evt.target.id === 'filter-discussed') {
    const picturesDiscussed = pictures.slice().sort(comparePosts);
    getMiniPictures(picturesDiscussed, 'filter');
    addMiniPictureHandlers(picturesDiscussed);
    return;
  }
}

function comparePosts(a, b) {
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  if (a.comments.length === b.comments.length) {
    return 0;
  }
  if (a.comments.length < b.comments.length) {
    return 1;
  }
}

function activateFilterButton (evt) {
  if(evt.target.classList.contains('img-filters__button')) {
  const filterButton = document.querySelectorAll('.img-filters__button');
  filterButton.forEach(button => {button.classList.remove('img-filters__button--active')})
    evt.target.classList.add('img-filters__button--active');
  }
  return;
}


export {showPostsFilter};
