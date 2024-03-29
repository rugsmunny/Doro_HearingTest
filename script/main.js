


document.addEventListener('DOMContentLoaded', changeBackgroundPictures);
/*
function sayHi(){
    const alarmBtn = Object.assign(document.createElement('button'), { id: 'alarm'});
    alarmBtn.innerText = 'PUSH ME';
    alarmBtn.onclick = playback;
    document.querySelector('#test').textContent = "SCRIPTET FUNKAR!";
    document.querySelector('body').append(alarmBtn);

        const soundToGet = '8000_50';
    console.log(soundToGet);
    new Audio(`resources/sounds/testsounds/${soundToGet}.ogg`).play();
}*/
const modal = document.querySelector('.app');
const form = document.querySelector('.title');
let testStarted = false;
let timeoutID = null;
function startTest(event) {
    event.preventDefault();
    testStarted = true;
    const infoSegments = document.querySelectorAll('.info');
    infoSegments.forEach(segment => segment.classList.add('hide'));
    modal.classList.add('hide');
    form.textContent = `Testet har startat. Du kommer att höra en serie ljud. Klicka på knappen när du hör ljudet.`;
}

const startBtn = document.querySelector('#start-test-btn');


startBtn.onclick = startTest;
let imageUrl = '';

function changeBackgroundPictures() {
    const imagesFolder = 'resources/images/hearing_buds/';
    const imageNames = ['1-black-box-top.png', '2-closed-black-box-top-45-degree.png', '3-closed-black-box-front.png', '4-open-case-front-no-grip.png', '5-closer-to-tilted-case.png', '6-up-down-no-grip.png', '7-big-small-no-grip.png', '8-all-tips-no-grip.png', '9-phone-with-aqua-cover-open.png'];
    let currentIndex = 0;
    let currentImage = 0;
    const imageSpinners = document.querySelectorAll('.image-spinner > div');

    function changeImage() {
        imageUrl = `url('${imagesFolder}${imageNames[currentIndex++]}')`;
        imageSpinners[currentImage].style.backgroundImage = imageUrl;
        imageSpinners[currentImage].classList.add('visible');

        timeoutID = setTimeout(() => {imageSpinners[currentImage].classList.remove('visible');}, 3000);
        
        currentIndex = currentIndex % imageNames.length;
        currentImage = (currentImage + 1) % 2;

        if (testStarted) {
            imageSpinners.forEach(spinner => spinner.classList.remove('visible'));
            clearTimeout(timeoutID);
            return;
        } else {
            console.log('testStarted: ', testStarted);
        }
    }

    if(!testStarted) setInterval(changeImage, 3000);
}