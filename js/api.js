import { thumbnails_render } from './thumbnails_render.js';
import { uploadFormErrorSubmit, uploadFormSuccessSubmit } from './popup_error.js';
import { setRemoveAttribute } from './form.js';
import { filters } from './filter.js'

const statusBadReq = 400;
const urls = [
    'http://localhost:3000/photos',
    'http://localhost:3000/comments',
    'http://localhost:3000/data'
];
let dataPhotos;
let dataComments;

const apiPosts = await Promise.all(urls.map(async url => {
    const response = await fetch(url);
    if (response.status === statusBadReq) uploadFormSuccessSubmit();
    switch (url) {
        case urls[0]:
            dataPhotos = await response.json();
            thumbnails_render(dataPhotos);
            filters(dataPhotos);
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
        uploadFormSuccessSubmit();
    } else {
        uploadFormErrorSubmit();
    }
    setRemoveAttribute();
};

export { apiPosts, apiSendData };

