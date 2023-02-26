import { effectSliderElement } from './effect.js'

const previewPhotoElement = document.querySelector('.img-upload__preview');
const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueInputElement = document.querySelector('.scale__control--value');

let defaultScale = 100;
const step = 25
const SliderValue = {
    MAX:100,
    MIN:0,
    STEP:1,
}

noUiSlider.create(effectSliderElement, {
    range:{
        min:SliderValue.MIN,
        max:SliderValue.MAX,
    },
    start:SliderValue.MAX,
    step:SliderValue.STEP,
    connect:'lower',
});

export const getStartZoomValue = () => {
    previewPhotoElement.style.transform = '';
    scaleValueInputElement.value = `${SliderValue.MAX}%`;
};

const getZoomOutClick = () => {
    if (defaultScale > step) {
        defaultScale -= step;
        scaleValueInputElement.value = `${defaultScale}%`;
        previewPhotoElement.style.transform = `scale(${defaultScale / 100})`;
    }
};

const getZoomInClick = () => {
    if (step <= defaultScale && defaultScale < 100) {
        defaultScale += step;
        scaleValueInputElement.value = `${defaultScale}%`;
        previewPhotoElement.style.transform = `scale(${defaultScale / 100})`;
    }
};

export const addClickZoomButton = () => {
    scaleSmallerButtonElement.addEventListener('click', getZoomOutClick);
    scaleBiggerButtonElement.addEventListener('click', getZoomInClick);
};



