import { debounce } from './utils.js';
import { thumbnails_render } from './thumbnails_render.js';

const TIME_OUT_DELAY = 500;
const RANDOM_PHOTO_AMOUNT = 10;
const imgFiltersElement = document.querySelector('.img-filters');
const sortDefaultButtonElement = imgFiltersElement.querySelector('#filter-default');
const sortRandomButtonElement = imgFiltersElement.querySelector('#filter-random');
const sortPopularButtonElement = imgFiltersElement.querySelector('#filter-discussed');

const loadUsersPhotos = (data) => {
    deleteUsersPhotos();
    thumbnails_render(data);
};

const deleteUsersPhotos = () => {
    const pictureList = document.querySelectorAll('.picture');
    pictureList.forEach((userPhoto) => userPhoto.remove());
};

const getFilterDebounce = debounce(loadUsersPhotos, TIME_OUT_DELAY);
const defaultSorting = (photos) => photos.slice();
const randomSorting = (photos) => photos.slice().sort(() =>  0.5 - Math.random()).slice(0, RANDOM_PHOTO_AMOUNT);
const popularSorting = (photos) => photos.slice().sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);

const changeClassButtons = (activeButton) => {
    imgFiltersElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
};

export const filters = (photos) => {
    imgFiltersElement.classList.remove('img-filters--inactive');

    sortDefaultButtonElement.addEventListener('click', (evt) => {
        changeClassButtons(evt.target);
        getFilterDebounce(defaultSorting(photos));
    });

    sortRandomButtonElement.addEventListener('click', (evt) => {
        changeClassButtons(evt.target);
        getFilterDebounce(randomSorting(photos));
    });

    sortPopularButtonElement.addEventListener('click', (evt) => {
        changeClassButtons(evt.target);
        getFilterDebounce(popularSorting(photos));
    });
};