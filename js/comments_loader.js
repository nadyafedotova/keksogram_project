import { comment_render } from './thumbnails_full_screen.js'

const COUNT_DEFAULT_COMMENTS = 5;
const socialCommentsCount = document.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.comments-loader');
const bigPicture = document.querySelector('.big-picture');
const fragment = new DocumentFragment();

const getComments = (comments, load) => {
    let commentsData;
    let commentsCountCurrent = bigPicture.querySelector('.comments-count-current');
    let commentsCountCurrentValue = COUNT_DEFAULT_COMMENTS;

    commentLoader.style.display = 'block';
    if (load && comments.length > COUNT_DEFAULT_COMMENTS && comments.length !== commentsCountCurrentValue) {
        commentsCountCurrentValue = +commentsCountCurrent.textContent + COUNT_DEFAULT_COMMENTS;

        if (comments.length === commentsCountCurrentValue) {
            commentLoader.style.display = 'none';
        }

        commentsData = comments.length > COUNT_DEFAULT_COMMENTS ? comments.slice(commentsCountCurrentValue - COUNT_DEFAULT_COMMENTS) : comments;
        if (load && commentsData.length < COUNT_DEFAULT_COMMENTS) {
            commentsCountCurrentValue += commentsData.length - COUNT_DEFAULT_COMMENTS;
            commentLoader.style.display = 'none';
        }
    }

    socialCommentsCountInnerHTML(commentsCountCurrentValue, comments.length)
    if (!load && comments.length <= COUNT_DEFAULT_COMMENTS) {
        commentLoader.style.display = 'none';
        socialCommentsCount.innerHTML = lessFiveComments(comments.length);
    }

    comments = commentsData ?? comments

    for (let i = 0; i < comments.length; i++) {
        if (!load && i >= COUNT_DEFAULT_COMMENTS) {
            break;
        } else if (load && i >= COUNT_DEFAULT_COMMENTS) {
            break;
        } else if (load && i > COUNT_DEFAULT_COMMENTS) {
            continue;
        }
        fragment.appendChild(comment_render(comments[i]));
    }

    return socialComments.appendChild(fragment);

};

const lessFiveComments = (commentsLength) => {
    let comments;
    switch (commentsLength) {
        case 0:
            comments = commentsLength + ' коментарів';
            break;
        case 1:
            comments = commentsLength + ' коментар';
            break;
        case 2:
            comments = commentsLength + ' коментаря';
            break;
        case 3:
            comments = commentsLength + ' коментарія';
            break;
        case 4:
            comments = commentsLength + ' коментаря';
            break;
        case 5:
            comments = commentsLength + ' коментарів';
            break;
    }
    return `<span class="comments-count-current"> ${comments} </span>`;
}

function socialCommentsCountInnerHTML (commentsCurrent, commentsLength) {
    return socialCommentsCount.innerHTML =
        `<span class="comments-count-current"> ${commentsCurrent} </span> з <span class="comments-count">${commentsLength}</span> комментарів`
}

export { getComments }

