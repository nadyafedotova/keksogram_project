import { onEscapeKey } from './utils.js';
import { body } from './thumbnails_full_screen.js';
import { getStartZoomValue, addClickZoomButton } from './scale.js';
import { resetPhotoEffects } from './effect.js';
import { apiSendData } from './api.js';
import { loadImageToUpload } from './loader.js';
import { idLast } from './main.js';

const uploadFile = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const hashtagInput = formUpload.querySelector('.text__hashtags');
const comment = formUpload.querySelector('.text__description');
const uploadFormButton = document.querySelector('.img-upload__submit');
const uploadedImage = document.querySelector('.img-upload__input');
const uploadPreviewElement = document.querySelector('.img-upload__preview > img');
const effectsImagesList = document.querySelectorAll('.effects__preview');
hashtagInput.removeAttribute('required');

formUpload.addEventListener('submit',  (event) => {
    event.preventDefault();
    uploadFormButton.setAttribute('disabled', true);
    let formData = Object.fromEntries(new FormData(event.target).entries());
    Object.assign(formData, { id:idLast + 1, url:uploadPreviewElement.src });
    apiSendData(formData);
});

export const setRemoveAttribute = () => uploadFormButton.removeAttribute('disabled');
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

export const closeUploadForm = () => {
    document.removeEventListener('keydown', onFormEscKeydown);
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    formUpload.reset();
};

uploadedImage.addEventListener('change', (evt) => {
    const target = evt.target;
    if (!FileReader) {
        throw new Error('Зчитувач файлів недоступен');
    }
    if (!target.files.length) {
        throw new Error('Нічого не завантажено');
    }
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => loadImageToUpload(uploadPreviewElement, fileReader, effectsImagesList));
    fileReader.readAsDataURL(target.files[0]);
});

uploadFile.addEventListener('change', openUploadForm);
uploadCancel.addEventListener('click', closeUploadForm);

export { onFormEscKeydown, hashtagInput, comment, openUploadForm }
