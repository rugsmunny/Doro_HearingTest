


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
let testStarted = false;
let timeoutID = null;
function startTest(event){
    event.preventDefault();

    testStarted = true;
    clearTimeout(timeoutID);
    const infoSegments = document.querySelectorAll('.info');
    infoSegments.forEach(segment => segment.classList.add('hide'));
}

const startBtn = document.querySelector('#start-test-btn');

startBtn.onclick = startTest;


function changeBackgroundPictures() {
    
    const imagesFolder = 'resources/images/hearing_buds/';
    const imageNames = ['1-black-box-top.png','2-closed-black-box-top-45-degree.png','3-closed-black-box-front.png','4-open-case-front-no-grip.png', '5-closer-to-tilted-case.png', '6-up-down-no-grip.png', '7-big-small-no-grip.png','8-all-tips-no-grip.png','9-phone-with-aqua-cover-open.png'];
    let currentIndex = 0;
    console.log(`changeBackgroundPictures current index ${currentIndex}`);
    function changeImage() {
        console.log(`changeImage current index ${currentIndex}`);
        const imageUrl = `url('${imagesFolder}${imageNames[currentIndex]}')`;
        modal.style.backgroundImage = `${imageUrl}, radial-gradient(circle at 0%, #008545 20%, #008545 55%, #fff 55%)`;
        currentIndex = (currentIndex + 1) % imageNames.length;
        timeoutID  = setTimeout(changeImage, 3500); 
        console.log(`changeBIMMAGE current index ${currentIndex}`);
        if(testStarted) {
            console.log('testStarted: ', testStarted);
            return;
        }
    }
    if(testStarted) {
        console.log('testStarted: ', testStarted);
        return;
    }
    changeImage();
}

