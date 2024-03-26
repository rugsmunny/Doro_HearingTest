/*
document.addEventListener('DOMContentLoaded', setTimeout(sayHi, 3000));

function sayHi(){
    const alarmBtn = Object.assign(document.createElement('button'), { id: 'alarm'});
    alarmBtn.innerText = 'PUSH ME';
    alarmBtn.onclick = playback;
    document.querySelector('#test').textContent = "SCRIPTET FUNKAR!";
    document.querySelector('body').append(alarmBtn);
}*/

function playback(event){
    event.preventDefault();
    const soundToGet = '8000_50';
    console.log(soundToGet);
    new Audio(`resources/sounds/testsounds/${soundToGet}.ogg`).play();
}

const startBtn = document.querySelector('#start-test-btn');

startBtn.onclick = playback;