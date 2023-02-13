import { onEscapeKey } from './utils.js';
import { body } from './thumbnails_full_screen.js';

const uploadFile = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const hashtagInput = formUpload.querySelector('.text__hashtags');
const comment = formUpload.querySelector('.text__description');
hashtagInput.removeAttribute('required');

formUpload.addEventListener('submit', function (event) {
    event.preventDefault();
}, true);

function onFormEscKeydown (evt) {
    if (onEscapeKey(evt)) {
        evt.preventDefault();
        closeUploadForm();
    }
}

const openUploadForm = () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onFormEscKeydown);
};

const closeUploadForm = () => {
    document.removeEventListener('keydown', onFormEscKeydown);
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.reset();
};

uploadFile.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);

export { onFormEscKeydown, hashtagInput, comment }
