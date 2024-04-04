/*
document.addEventListener('DOMContentLoaded', setTimeout(sayHi, 3000));

function sayHi(){
    const alarmBtn = Object.assign(document.createElement('button'), { id: 'alarm'});
    alarmBtn.innerText = 'PUSH ME';
    alarmBtn.onclick = playback;
    document.querySelector('#test').textContent = "SCRIPTET FUNKAR!";
    document.querySelector('body').append(alarmBtn);
}*/

function playback(event) {
    event.preventDefault();
    const soundToGet = '8000_50';
    console.log(soundToGet);
    new Audio(`resources/sounds/testsounds/${soundToGet}.ogg`).play();
}

let pageNumber = 1;
let navButtons = document.querySelectorAll('.nav-button');
navButtons.forEach(button => button.addEventListener('click', function () {
console.log(`pageNumber : ${pageNumber}`);
    const slideToRemove = document.getElementById(`slide-${pageNumber}`);
    pageNumber += parseInt(button.dataset.direction);
    console.log(`pageNumber : ${pageNumber}`);
    const slideToShow = document.getElementById(`slide-${pageNumber}`);
    slideToRemove.classList.add('fade-out');

    setTimeout(function () {
        slideToRemove.style.display = 'none';
        slideToShow.style.display = 'flex';
        slideToShow.classList.add('fade-in');
    }, 2000);


}));

const selectElement = document.getElementById("year-of-birth");
const currentYear = new Date().getFullYear();
let option = document.createElement("option");
option.textContent = "";
selectElement.appendChild(option);
for (var year = currentYear; year >= currentYear - 120; year--) {
    option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectElement.appendChild(option);
}

