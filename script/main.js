const calibrationBtn = document.querySelector('.calibrate-button');
const formBtn = document.getElementById('form-btn');
const genderRadioButtons = document.querySelectorAll('.input-radio');
const soundCheckBoxes = document.querySelectorAll('.input-checkbox');
const otherInput = document.getElementById('other-text');
const yearOfBirth = document.getElementById("year-of-birth");
const dialogTextContainer = document.getElementById('dialog-text');
document.getElementById('dialog-close-btn').addEventListener('click', () => window.dialog.close());
const soundTestIteration = document.getElementById('sound-test-iteration');
const nextSoundButton = document.getElementById('next-sound');
const previousSoundButton = document.getElementById('previous-sound');
const soundTrackButtons = document.querySelectorAll('.sound-track-button');
const soundTrackEclipse = document.querySelector('.eclipse');
const currentYear = new Date().getFullYear();
let birthYearOption = document.createElement("option");
let pageNumber = 4;
let soundTrackEclipseTracker = 0;

const withHeadphonesText = 'For both left and right ear, there are 5 sliders, each playing the same sound at a different frequency.<br><br>Adjust each slider to increase or decrease the volume level until you can barely hear the sound on that slider.';
const withoutHeadphonesText = 'There are 5 sliders, each playing the same sound at a different frequency.<br><br>Adjust each slider up or down to increase or decrease the volume level until you can barely hear the sound on that slider.';
const hearingbudsMayHelpTitle = 'The HearingBuds may help';
const hearingbudsMayHelpText = 'Your test results show that you have mild to moderate hearing loss in both ears across different frequencies.';
const hearingbudsMayNotHelpTitle = 'The HearingBuds will probably not help you';
const hearingbudsMayNotHelpText = 'Based on your online hearing test results, your hearing sensitivity is within normal range across all frequencies tested.';


yearOfBirth.addEventListener('input', validateForm);
genderRadioButtons.forEach(radioButton => radioButton.addEventListener('click', validateForm));
soundCheckBoxes.forEach(checkbox => checkbox.addEventListener('click', validateForm));
otherInput.addEventListener('input', validateForm);
calibrationBtn.addEventListener('click', playback);
soundTrackButtons.forEach(button => button.addEventListener('click', handleVolumeButtonClick));

nextSoundButton.addEventListener('click', () => {
    previousSoundButton.style.visibility = 'visible';
    let iteration = +parseInt(soundTestIteration.textContent);
    if (iteration === 5) {
        getSlide(nextSoundButton);
    }
    if (iteration < 5) {
        soundTestIteration.textContent = ++iteration;
        if (iteration === 5) {
            nextSoundButton.querySelector('p').textContent = 'Finish test';
        }
    }



});

previousSoundButton.addEventListener('click', () => {
    nextSoundButton.querySelector('p').textContent = 'Next sound';
    soundTestIteration.textContent = parseInt(soundTestIteration.textContent) - 1;
    if (parseInt(soundTestIteration.textContent) === 1) {
        previousSoundButton.style.visibility = 'hidden';
    }
});


function handleVolumeButtonClick(event) {
    event.preventDefault();
    const value = +event.currentTarget.getAttribute('value');
    if (value + soundTrackEclipseTracker >= 0 && value + soundTrackEclipseTracker <= 6) {
        soundTrackEclipseTracker += value;
        soundTrackEclipse.style.left = `calc((100% / 6) * ${soundTrackEclipseTracker} - 1.5rem)`;
    }

    playback(event, soundTrackEclipseTracker + 1);

}

function playback(event, volume = 7) {
    event.preventDefault();
    const soundToGet = '8000_50';
    console.log(soundToGet);
    const audio = new Audio(`resources/sounds/testsounds/${soundToGet}.ogg`);
    audio.volume = (1 / 7) * volume;
    audio.play();
}

formBtn.addEventListener('mouseenter', () => {
    if (formBtn.classList.contains('inactive') && !document.querySelector('.tooltip')) {
        showTooltip();
    }
});

function showTooltip() {

    const tooltip = document.createElement('p');
    tooltip.textContent = 'Please answer all questions before clicking next.';
    tooltip.classList.add('tooltip');

    document.body.appendChild(tooltip);

    const mouseMoveHandler = (event) => updateTooltip(event, tooltip);
    document.addEventListener('mousemove', mouseMoveHandler);

    setTimeout(function () {
        tooltip.remove();
        document.removeEventListener('mousemove', mouseMoveHandler);
    }, 2400);
}

function updateTooltip(event, tooltip) {
    tooltip.style.left = event.clientX + 'px';
    tooltip.style.top = event.clientY + 'px';
    console.log(`event.clientX : ${event.clientX}`);
}





function navigate(event) {
    const buttonClicked = event.currentTarget;

    if (buttonClicked.classList.contains('inactive')) {
        return;
    }

    if (buttonClicked.getAttribute('id') !== null && buttonClicked.classList.contains('headphones')) {
        const testToRun = buttonClicked.getAttribute('id').includes('without');
        const textToShow = testToRun ? withoutHeadphonesText : withHeadphonesText;
        document.getElementById('start-hearing-test').addEventListener('click', runTest(testToRun, buttonClicked));
        dialogTextContainer.innerHTML = `<p>${textToShow}<p>`;
        window.dialog.showModal();
        return;
    }

    getSlide(buttonClicked)

}


function getSlide(buttonClicked) {

    buttonClicked.removeEventListener('click', arguments.callee);
    const slideToRemove = document.getElementById(`slide-${pageNumber}`);
    slideToRemove.classList.add('fade-out');
    pageNumber += parseInt(buttonClicked.getAttribute('data-direction'));
    const slideToShow = document.getElementById(`slide-${pageNumber}`);

    setTimeout(function () {
        slideToRemove.style.display = 'none';
        slideToRemove.classList.remove('fade-out');
        slideToShow.style.display = 'flex';
        slideToShow.classList.add('fade-in');
        buttonClicked.addEventListener('click', arguments.callee);
    }, 2000);

}
function runTest(testToRun, buttonClicked) {
    if (testToRun) {
        getSlide(buttonClicked);
    } else { getSlide(buttonClicked); }

    window.dialog.close();
    console.log(testToRun);
}

birthYearOption.textContent = "";
yearOfBirth.appendChild(birthYearOption);
for (var year = currentYear; year >= currentYear - 120; year--) {
    birthYearOption = document.createElement("option");
    birthYearOption.value = year;
    birthYearOption.textContent = year;
    yearOfBirth.appendChild(birthYearOption);
}



function validateForm() {
    const selectedYear = yearOfBirth.value !== "";
    const atLeastOneRadioChecked = Array.from(genderRadioButtons).some(radioButton => radioButton.checked);
    const atLeastOneCheckboxChecked = Array.from(soundCheckBoxes).some(checkbox => checkbox.checked);
    const otherCheckboxChecked = document.getElementById('other-checkbox').checked;
    const otherInputValid = !otherCheckboxChecked || (otherCheckboxChecked && otherInput.value.length >= 5);

    if (selectedYear && atLeastOneRadioChecked && atLeastOneCheckboxChecked && otherInputValid) {
        formBtn.classList.remove('inactive');
    } else {
        formBtn.classList.add('inactive');
    }
}




