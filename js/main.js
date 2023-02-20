import { apiPosts } from './api.js';
import { thumbnailsFullScreen } from './thumbnails_full_screen.js';
import './form.js';
import './validation.js';
import { applyPhotoEffects } from './effect.js'

const data = apiPosts;

applyPhotoEffects();

const pictureList = document.querySelectorAll('.picture');
pictureList.forEach((e) => e.addEventListener('click', (evt) => {
    const id = +evt.target.dataset.id;
    const actualData = data[0].find((e) => e.id === id);
    thumbnailsFullScreen(actualData);
}))
