const pictures = document.querySelector('.pictures')
const pictureTemplate  = document.getElementById("picture");
const fragment = new DocumentFragment();

function thumbnails_render(data) {
  data.map(photo => {
    const pictureElement = pictureTemplate.content.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    fragment.appendChild(pictureElement);
  });
  pictures.appendChild(fragment)
}

export {thumbnails_render};
