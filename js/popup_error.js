import { body } from './thumbnails_full_screen.js';
import { onEscapeKey } from './utils.js';
import { closeUploadForm } from './form.js';

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplateElement.cloneNode(true);
const errorButtonElement = errorMessageElement.querySelector('.error__button');

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplateElement.cloneNode(true);
const successButtonElement = successMessageElement.querySelector('.success__button');


const errorMessageShow = () => {
    body.classList.add('modal-open');
    body.append(errorMessageElement);
    errorMessageElement.style.zIndex = '100';
    document.addEventListener('keydown', onErrorMessageEscClose);
    document.addEventListener('click', onErrorMessageAnyClickClose);
};

const errorMessageClose = () => {
    body.classList.remove('modal-open');
    errorMessageElement.remove();
    document.removeEventListener('keydown', onErrorMessageEscClose);
    document.removeEventListener('click', onErrorMessageAnyClickClose);
};

errorButtonElement.addEventListener('click', () => errorMessageClose());

const onErrorMessageEscClose = (evt) => {
    if (onEscapeKey(evt)) {
        evt.preventDefault();
        errorMessageClose();
    }
}

const onErrorMessageAnyClickClose = (evt) => {
    if (evt.target === errorMessageElement) errorMessageClose()
};

const successMessageShow = () => {
    body.classList.add('modal-open');
    body.append(successMessageElement);
    document.addEventListener('keydown', onSuccessMessageEscClose);
    document.addEventListener('click', onSuccessMessageAnyClickClose);
};

const successMessageClose = () => {
    body.classList.remove('modal-open');
    successMessageElement.remove();
    document.removeEventListener('keydown', onSuccessMessageEscClose);
    document.removeEventListener('click', onSuccessMessageAnyClickClose);
};

successButtonElement.addEventListener('click', () => {
    successMessageClose();
    location.reload();
});

const onSuccessMessageEscClose = (evt) => {
    if (onEscapeKey(evt)) {
        evt.preventDefault();
        successMessageClose();
    }
}

const onSuccessMessageAnyClickClose = (evt) => {
    if (evt.target === successMessageElement) successMessageClose();
}

export const uploadFormSuccessSubmit = () => {
    closeUploadForm();
    successMessageShow();
};

export const uploadFormErrorSubmit = () => {
    closeUploadForm();
    errorMessageShow();
};