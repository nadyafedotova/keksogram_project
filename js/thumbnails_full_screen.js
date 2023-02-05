const onEscapeKey = (evt) => evt.key === 'Escape';
const body = document.querySelector('body');
const pictureCancelPopup = document.querySelector('#picture-cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.comments-count');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComment = document.querySelector('.social__comment');
const fragment = new DocumentFragment();

function comment_render(data) {
  socialComments.innerHTML = '';
  data.forEach(element => {
    const comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    fragment.appendChild(comment);
  });
  socialComments.appendChild(fragment);
}

const closePopup = (evt) => {
  if (onEscapeKey(evt)) {
    evt.preventDefault();
    closePopupPhoto();
  }
};

function closePopupPhoto() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', closePopup);
}

function thumbnailsFullScreen(data) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = data.url;
  commentsCount.textContent = data.comments.length;
  likesCount.textContent = data.likes;
  socialCaption.textContent = data.description;
  comment_render(data.comments);

  document.addEventListener('keydown', closePopup);
}
pictureCancelPopup.addEventListener('click', closePopupPhoto);

export {thumbnailsFullScreen};
