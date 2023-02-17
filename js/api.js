import { thumbnails_render } from './thumbnails_render.js'
import { popupError } from './popup_error.js'

const statusBadReq = 400;
const urls = [
    'http://localhost:3000/photos',
    'http://localhost:3000/comments'
];
let dataPhotos;
let dataComments;

const apiPosts = await Promise.all(urls.map(async url => {
    const response = await fetch(url);
    if (response.status === statusBadReq) popupError('Не вдалося завантажити дані.');

    switch (url) {
        case urls[0]:
            dataPhotos = await response.json();
            thumbnails_render(dataPhotos);
            return dataPhotos;
        case urls[1]:
            return dataComments = await response.json();
    }
}));

export { apiPosts };

