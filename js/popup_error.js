import { body, closePopup } from './thumbnails_full_screen.js';

const popupErrorContainer = document.createElement('div');
const popupErrorButton = document.createElement('p');
const popupEscButton = document.createElement('span');

const popupError = (message) => {
    popupErrorContainer.classList.remove('hidden');
    popupErrorContainer.style.zIndex = '100';
    popupErrorContainer.style.width = '500px';
    popupErrorContainer.style.borderRadius = '15px';
    popupErrorContainer.style.position = 'absolute';
    popupErrorContainer.style.left = '36%';
    popupErrorContainer.style.right = '36%';
    popupErrorContainer.style.top = '30%';
    popupErrorContainer.style.padding = '30px';
    popupErrorContainer.style.fontSize = '18px';
    popupErrorContainer.style.color = '#24272e';
    popupErrorContainer.style.backgroundColor = '#979fb0';
    popupErrorContainer.style.textAlign = 'center';
    popupErrorContainer.lineHeight = '1.5';

    popupErrorButton.style.backgroundColor = '#497be6';
    popupErrorButton.style.borderRadius = '15px';
    popupErrorButton.style.padding = '15px';
    popupErrorButton.style.width = '300px';
    popupErrorButton.style.margin = '15px auto 10px ';
    popupErrorButton.style.cursor = 'pointer';

    popupErrorContainer.textContent = message;
    popupErrorButton.textContent = 'Перезавантажити';
    popupEscButton.classList.add('img-message__cancel');
    popupEscButton.classList.add('cancel');
    popupEscButton.id = 'message-cancel';
    document.body.append(popupErrorContainer);
    popupErrorContainer.append(popupEscButton);
    popupErrorContainer.append(popupErrorButton);
}

function closePopupPhoto () {
    popupErrorContainer.classList.add('hidden');
    body.classList.remove('modal-open');
    document.addEventListener('keydown', closePopup);
}

popupErrorButton.onclick = () => location.reload()
popupEscButton.addEventListener('click', closePopupPhoto);

export { popupError };