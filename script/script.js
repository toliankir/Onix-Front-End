const notifyMassage = 'Are you sure you want to change the number of tasks?';

document.addEventListener('DOMContentLoaded', () => {

    const completedTaskCounterElement = document.querySelector('#completed-task');
    const openTaskCounterElement = document.querySelector('#open-task');
    const bottomImagesElements = document.querySelectorAll('.images img');
    const notifyElement = document.querySelector('#notify');

    completedTaskCounterElement.addEventListener('click', () => {
        if (!confirm(notifyMassage)) {
            return;
        }
        
        if (openTaskCounterElement.innerText !== '0') {
            openTaskCounterElement.innerText = parseInt(openTaskCounterElement.innerText) - 1;
        }
        completedTaskCounterElement.innerText = parseInt(completedTaskCounterElement.innerText) + 1;
    });

    bottomImagesElements.forEach((el, index) =>
        el.addEventListener('click', () => { notifyElement.innerText = index }));
});
