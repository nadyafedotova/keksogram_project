import { data } from './data.js';
import { thumbnails_render } from './thumbnails_render.js';
import { thumbnailsFullScreen } from './thumbnails_full_screen.js';
import './form.js';
import './validation.js';

thumbnails_render(data);

const pictureList = document.querySelectorAll('.picture');
pictureList.forEach((e) => e.addEventListener('click', (evt) => {
    const id = +evt.target.dataset.id;
    const actualData = data.find((e) => e.id === id);
    thumbnailsFullScreen(actualData);
}))
