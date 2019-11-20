const NOTIFY_MESSAGE = 'Are you sure you want to change the number of tasks?';

document.addEventListener('DOMContentLoaded', () => {
    //Selects objects that be handle
    const completedTaskCounterElement = document.querySelectorAll(".task-count")[0];
    const openTaskCounterElement = document.querySelectorAll(".task-count")[1];
    const bottomImagesElements = document.querySelectorAll('.images img');
    const notifyElement = document.querySelector('#notify');

    //Adds event listener for Completed task field
    completedTaskCounterElement.addEventListener('click', () => {
        //If user cancel request, exit
        if (!confirm(NOTIFY_MESSAGE)) {
            return;
        }
        //Decreases open task count if it is more than 0
        if (openTaskCounterElement.innerText !== '0') {
            openTaskCounterElement.innerText--;
        }

        //Increment completed task counter
        completedTaskCounterElement.innerText++;
    });

    //Sets event handlers for bottom side images
    bottomImagesElements.forEach((el, index) =>
        el.addEventListener('click', () => { notifyElement.innerText = index }));
});
