const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    start.disabled = true;
    stop.disabled = false;
}

function onStopClick() {
    clearInterval(timerId);
    start.disabled = false;
    stop.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}
