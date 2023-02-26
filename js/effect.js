const effectsContainerElement = document.querySelector('.effects__list');
const effectSliderContainerElement = document.querySelector('.effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const uploadPhotoElement = document.querySelector('.img-upload__preview img');

const photoEffects = {
    chrome:{
        filter:'grayscale',
        unit:'',
        options:{
            range:{
                min:0,
                max:1,
            },
            start:1,
            step:0.1,
        },
    },
    sepia:{
        filter:'sepia',
        unit:'',
        options:{
            range:{
                min:0,
                max:1,
            },
            start:1,
            step:0.1,
        },
    },
    marvin:{
        filter:'invert',
        unit:'%',
        options:{
            range:{
                min:0,
                max:100,
            },
            start:100,
            step:1,
        },
    },
    phobos:{
        filter:'blur',
        unit:'px',
        options:{
            range:{
                min:0,
                max:3,
            },
            start:3,
            step:0.1,
        },
    },
    heat:{
        filter:'brightness',
        unit:'',
        options:{
            range:{
                min:1,
                max:3,
            },
            start:3,
            step:0.1,
        },
    },
};

export const resetPhotoEffects = () => {
    effectLevelValueElement.value = '';
    uploadPhotoElement.className = '';
    uploadPhotoElement.style.filter = '';
    effectSliderContainerElement.classList.add('hidden');
    effectSliderElement.setAttribute('disabled', true);
};

const getPhotoEffects = (evt) => {
    if (evt.target.matches('input[type="radio"]')) {
        const currentValue = evt.target.value;
        if (currentValue === 'none') {
            resetPhotoEffects();
            return;
        }

        effectSliderContainerElement.classList.remove('hidden');
        effectSliderElement.removeAttribute('disabled', true);
        uploadPhotoElement.classList.add(`effects__preview--${currentValue}`);

        effectSliderElement.noUiSlider.updateOptions(photoEffects[currentValue].options);

        effectSliderElement.noUiSlider.on('update', () => {
            effectLevelValueElement.value = effectSliderElement.noUiSlider.get();

            const { filter, unit } = photoEffects[currentValue];
            uploadPhotoElement.style.filter = `${filter}(${effectLevelValueElement.value}${unit})`;
        });
    }
};

export const applyPhotoEffects = () => effectsContainerElement.addEventListener('change', getPhotoEffects);

export { effectSliderElement }


