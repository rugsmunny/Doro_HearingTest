const pageNumber = document.querySelector('#page-number-digit');
const navigationButtons = document.querySelectorAll('.navigation-button');


//navigationButtons[0].style.display = 'none';
navigationButtons[1].addEventListener('mouseover', showTooltip);

navigationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pageNavigation = parseInt(button.dataset.direction);
        getPage(pageNavigation);
    });
});

function getPage(pageNavigation) {
    let currentPageNumber = parseInt(pageNumber.textContent);
    currentPageNumber += pageNavigation;
    
/*     navigationButtons[0].style.display = currentPageNumber > 1 ? 'inline-block' : 'none';
    navigationButtons[1].style.display = currentPageNumber < 4 ? 'inline-block' : 'none'; */
    
    pageNumber.textContent = currentPageNumber;
}

function showTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'block';
    button.addEventListener('mouseout', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}
const totalPages = 4;
const progressPercentage = (currentPageNumber / totalPages) * 100;

const progressBarInner = document.querySelector('.progress-bar-inner');
progressBarInner.style.width = progressPercentage + '%';
