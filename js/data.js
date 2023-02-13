const countObjects = 25;
const minLikeValue = 15;
const maxLikeValue = 200;
const minAvatarValue = 1;
const countAvatar = 6;
const minCommentId = 1;
const countCommentId = 300;
const minCountMessage = 1;

const descriptions = [
    'Вогонь',
    'Гарне',
    'Чудово',
    'Ну таке',
    'Видали',
];

const message = [
    'Все відмінно!',
    'Загалом все непогано. Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?',
];

const names = [
    'Богдан',
    'Олександра',
    'Тетяна',
    'Катерина',
    'Володимир',
];

const generateCommentId = createRandomGenerator(minCommentId, countCommentId);

function getRandomNumber (min, max) {
    let minValue = Math.ceil(min);
    let maxValue = Math.floor(max);
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomElement (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
}

function getOffer (index) {
    const id = index + 1;
    return {
        id:id,
        url:`photos/${id}.jpg`,
        description:getRandomElement(descriptions),
        likes:getRandomNumber(minLikeValue, maxLikeValue),
        comments:Array.from({ length:getRandomNumber(minCountMessage, message.length) }, commentsContent),
    }
}

function commentsContent () {
    return {
        id:generateCommentId(),
        avatar:`img/avatar-${getRandomNumber(minAvatarValue, countAvatar)}.svg`,
        message:getRandomElement(message),
        name:getRandomElement(names),
    };
}

function createRandomGenerator (min, max) {
    const prevValues = [];

    return () => {
        let currentValue = getRandomNumber(min, max);
        if (prevValues.length >= (max - min + 1)) {
            return null;
        }
        while (prevValues.includes(currentValue)) {
            currentValue = getRandomNumber(min, max);
        }
        prevValues.push(currentValue);
        return currentValue;
    };
}

const data = new Array(countObjects).fill(countObjects).map((e, index) => getOffer(index))

export { data }
