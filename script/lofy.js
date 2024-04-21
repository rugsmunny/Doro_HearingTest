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

    if (button.classList.contains('inactive')) {
        return;
    }
    const slideToRemove = document.getElementById(`slide-${pageNumber}`);
    pageNumber += parseInt(button.dataset.direction);
    console.log(`pageNumber : ${pageNumber}`);
    const slideToShow = document.getElementById(`slide-${pageNumber}`);
    slideToRemove.classList.add('fade-out');

    setTimeout(function () {
        slideToRemove.style.display = 'none';
        slideToRemove.classList.remove('fade-out');
        slideToShow.style.display = 'flex';
        slideToShow.classList.add('fade-in');
    }, 2000);
}));
const formRequirements = [0, 0, 0];
const yearOfBirth = document.getElementById('year-of-birth');

yearOfBirth.addEventListener('input', function () {

    const currentYear = new Date().getFullYear();
    if (parseInt(this.value) > currentYear || parseInt(this.value) < currentYear - 100) {
        alert('Please enter a valid year of birth.');
        formRequirements[0] = 0;
    } else {
        formRequirements[0] = 1;
    }
    validateForm();
});

const genderRadioButtons = document.querySelectorAll('.input-radio');
genderRadioButtons.forEach(radioButton => radioButton.addEventListener('click', function () {
    if (Array.from(genderRadioButtons).some(radioButton => radioButton.checked)) {
        formRequirements[1] = 1;
    }
    validateForm();
}));

const soundCheckBoxes = document.querySelectorAll('.input-checkbox');
const otherInput = document.getElementById('other-text');

function validateForm() {

    soundCheckBoxes.forEach(checkbox => {
        if (checkbox.checked) {
            if (checkbox.id === 'other-checkbox' && otherInput.value.length < 5) {
                alert('Please elaborate on your answer in the text field.');
                return;
            }
            formRequirements[2] = 1;
        }
    });
    
    if (formRequirements.reduce((acc, val) => acc + val) === 3) {
        document.getElementById('form-btn').classList.remove('inactive');
    } else {
        document.getElementById('form-btn').classList.add('inactive');
    }
}




