let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const timer = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        pause();
    }
});

lapResetBtn.addEventListener('click', () => {
    if (running) {
        lap();
    } else {
        reset();
    }
});

function start() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTimer, 10);
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.remove('start');
    startPauseBtn.classList.add('pause');
    lapResetBtn.textContent = 'Lap';
    running = true;
}

function pause() {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    startPauseBtn.classList.add('start');
    lapResetBtn.textContent = 'Reset';
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    timer.textContent = '00:00:00.00';
    difference = 0;
    lapCount = 0;
    laps.innerHTML = '';
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    startPauseBtn.classList.add('start');
    lapResetBtn.textContent = 'Lap';
    running = false;
}

function lap() {
    lapCount++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCount}: ${timer.textContent}`;
    laps.appendChild(lapTime);
}

function updateTimer() {
    updatedTime = new Date().getTime() - startTime;
    timer.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}
