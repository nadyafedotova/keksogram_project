import { onEscapeKey } from './utils.js';
import { body } from './thumbnails_full_screen.js';
import { getStartZoomValue, addClickZoomButton } from './scale.js';
import { resetPhotoEffects } from './effect.js'

const uploadFile = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const hashtagInput = formUpload.querySelector('.text__hashtags');
const comment = formUpload.querySelector('.text__description');
hashtagInput.removeAttribute('required');

formUpload.addEventListener('submit',  (event) => event.preventDefault(), true);

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
    getStartZoomValue();
    addClickZoomButton();
    resetPhotoEffects();
};

const closeUploadForm = () => {
    document.removeEventListener('keydown', onFormEscKeydown);
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
};

uploadFile.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);

export { onFormEscKeydown, hashtagInput, comment }
