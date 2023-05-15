import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysValue = timer.querySelector('[data-days]');
const hoursValue = timer.querySelector('[data-hours]');
const minutesValue = timer.querySelector('[data-minutes]');
const secondsValue = timer.querySelector('[data-seconds]');
const input = document.getElementById('datetime-picker');

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};

flatpickr('#datetime-picker', options);

let countdownTimer = null;

startBtn.addEventListener('click', startCountdown);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

function updateCountdown(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysValue.textContent = formatTime(days);
    hoursValue.textContent = formatTime(hours);
    minutesValue.textContent = formatTime(minutes);
    secondsValue.textContent = formatTime(seconds);
}

function stopCountdown() {
    clearInterval(countdownTimer);
}

function startCountdown() {
    const selectedDate = flatpickr.parseDate(input.value);

    countdownTimer = setInterval(() => {
        const ms = selectedDate - new Date();

        if (ms <= 0) {
            stopCountdown();
            timer.classList.add('timer--finished');
            Notiflix.Notify.info('Countdown finished!');
            return;
        }

        updateCountdown(ms);
    }, 1000);

    Notiflix.Notify.success('Countdown started!');
}
