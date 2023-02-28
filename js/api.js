import { thumbnails_render } from './thumbnails_render.js';
import { popupError } from './popup_error.js';
import { setRemoveAttribute } from './form.js';

const statusBadReq = 400;
const urls = [
    'http://localhost:3000/photos',
    'http://localhost:3000/comments',
    'http://localhost:3000/data'
];
let dataPhotos;
let dataComments;
const errUploadMessage = 'Не вдалося завантажити дані.';
const successSendMessage = 'Дані благополучно відправлені.';
const errSendMessage = 'Не вдалося відправити дані. Будь ласка спробуйте ще раз';

const apiPosts = await Promise.all(urls.map(async url => {
    const response = await fetch(url);
    if (response.status === statusBadReq) popupError(errUploadMessage);
    switch (url) {
        case urls[0]:
            dataPhotos = await response.json();
            thumbnails_render(dataPhotos);
            return dataPhotos;
        case urls[1]:
            return dataComments = await response.json();
    }
}));

const apiSendData = async (data) => {
    const response = await fetch(urls[2], {
        method:'POST',
        body:JSON.stringify(data),
    });

    if (response.ok) {
        popupError(successSendMessage);
    } else {
        popupError(errSendMessage);
    }
    setRemoveAttribute();
};

export { apiPosts, apiSendData };

