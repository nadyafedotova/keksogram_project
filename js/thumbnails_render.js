const pictures = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture');
const fragment = new DocumentFragment();

function thumbnails_render (data) {
    data.forEach(photo => {
        const pictureElement = pictureTemplate.content.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = photo.url;
        pictureElement.querySelector('.picture__img').dataset.id = photo.id;
        pictureElement.querySelector('.picture__comments').textContent = photo.comments ? photo.comments.length : 0;
        pictureElement.querySelector('.picture__likes').textContent = photo.likes;
        fragment.appendChild(pictureElement);
    });
    pictures.appendChild(fragment);
}

export { thumbnails_render };
