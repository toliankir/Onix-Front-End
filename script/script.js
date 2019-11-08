const completedTaskCounterElement = document.querySelector('#completed-task');
const openTaskCounterElement = document.querySelector('#open-task');

completedTaskCounterElement.addEventListener('click', () => {

    completedTaskCounterElement.innerText = parseInt(completedTaskCounterElement.innerText) + 1;
    // completedTaskCounterElement.innerText = parseInt(completedTaskCounterElement.innerText)++;
});

// console.log(completedTaskCounterElement);
// completedTaskCounterElement.innerText = 123;