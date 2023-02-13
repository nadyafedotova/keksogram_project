import { onFormEscKeydown, hashtagInput, comment } from './form.js';

const MAX_HASHTAG_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const regex = new RegExp("^#.*[^A-zА-яЁё0-9#].*$");

comment.addEventListener('focus', () => document.removeEventListener('keydown', onFormEscKeydown));
comment.addEventListener('blur', () => document.addEventListener('keydown', onFormEscKeydown));
hashtagInput.addEventListener('focus', () => document.removeEventListener('keydown', onFormEscKeydown));
hashtagInput.addEventListener('blur', () => document.addEventListener('keydown', onFormEscKeydown));

hashtagInput.addEventListener('input', (evt) => {
    hashtagInput.setCustomValidity('');
    hashtagInput.style.border = 'none';
    const hashtagText = evt.target.value.trim();
    if (hashtagText.length > 0) {
        let inputArray = hashtagText.split(/\s+/);
        const isStartNotHashtag = inputArray.some((item) => item[0] !== '#');
        if (isStartNotHashtag) evt.target.setCustomValidity('Хештег починається з символу # (решітка)');

        const isOnlyLatticeHashtag = inputArray.some((item) => item === '#' && item.length === 1);
        if (isOnlyLatticeHashtag) evt.target.setCustomValidity('Хештег не може складатися тільки з решітки');

        const isSplitSpaceHashtag = inputArray.some((item) => item.indexOf('#', 1) >= 1);
        if (isSplitSpaceHashtag) evt.target.setCustomValidity('Хештеги повинні розділятися пробілами');

        const isQuantityHashtag = inputArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS)
        if (isQuantityHashtag) evt.target.setCustomValidity(`Максимальна довжина хештегу ${MAX_HASHTAG_SYMBOLS} символів`);

        if (inputArray.length > MAX_HASHTAGS) evt.target.setCustomValidity(`Максимально можна вказати ${MAX_HASHTAGS} хештегів`);

        const isRepeatingHashtag = inputArray.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1);
        if (isRepeatingHashtag) evt.target.setCustomValidity('Один і той же хештег не може бути використаний двічі');

        const isNotOnlyLetAndNum = inputArray.some((item) => regex.test(item));
        if (isNotOnlyLetAndNum) evt.target.setCustomValidity('Cтрока післе решітки має складатися з літер та чисел');

        evt.target.reportValidity();
        if (!(evt.target.checkValidity())) {
            evt.target.style.border = '2px solid red';
        } else {
            evt.target.style.border = 'none';
        }
    }
});