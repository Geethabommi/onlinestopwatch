//collecting required values and initializing values
let startbtn = document.getElementById("startbtn");
let stopbtn = document.getElementById("stopbtn");
let resetbtn = document.getElementById("resetbtn");
let displayTime = document.getElementById("timer");
let alertSound = document.getElementById("alertaudio");
let durationdiv = document.getElementById("alertdurations");
durationdiv.style.display = "none";
let timer = null;
stopbtn.disabled = true;
resetbtn.disabled = true;
let showAlertSetting = false;
let [millisec, sec, min, hr] = [0, 0, 0, 0];
let [timerSoundHr, timerSoundMin, timerSoundSec] = [0, 0, 0];

//function to handle start of the timer
let startFunc = function () {
  startbtn.disabled = true;
  stopbtn.disabled = false;
  resetbtn.disabled = false;
  timer = setInterval(countDown, 10);
};

//function to calculate the timer for stopwatch
let countDown = function () {
  millisec += 10;
  if (millisec >= 1000) {
    sec++;
    playSound();
    millisec = 0;
  }
  if (sec == 60) {
    min++;
    playSound();
    sec = 0;
  }
  if (min == 60) {
    hr++;
    playSound();
    min = 0;
  }
  displayTimeFunc();
};

//function to stop the timer
let stopFunc = function () {
  startbtn.disabled = false;
  clearInterval(timer);
};

//function to reset the timer
let resetFunc = function () {
  startbtn.disabled = false;
  stopbtn.disabled = true;
  resetbtn.disabled = true;
  clearInterval(timer);
  [millisec, sec, min, hr] = [0, 0, 0, 0];
  displayTime.innerHTML = "00:00:00";
};

//function to format the display of the stopwatch
let displayTimeFunc = function () {
  let hour = hr < 10 ? "0" + hr : hr;
  let minute = min < 10 ? "0" + min : min;
  let second = sec < 10 ? "0" + sec : sec;

  displayTime.innerHTML = `${hour}:${minute}:${second}`;
};

//function which handles alert checkbox
function alertCheckboxFunc() {
  let checkbox = document.getElementById("alertSound");
  console.log(checkbox.checked);

  if (checkbox.checked == true) {
    showAlertSetting = true;
  } else {
    showAlertSetting = false;
    timerSoundHr = 0;
    timerSoundMin = 0;
    timerSoundSec = 0;
    document.getElementById("alerthour").value = "";
    document.getElementById("alertmin").value = "";
    document.getElementById("alertsec").value = "";
    console.log(typeof document.getElementById("alertsec").value);
  }
  showDurationSetting();
}

//function to show the duration field settings
function showDurationSetting() {
  if (showAlertSetting) {
    durationdiv = document.getElementById("alertdurations");
    if (durationdiv.style.display === "none") {
      durationdiv.style.display = "block";
    }
  } else {
    durationdiv.style.display = "none";
  }
}

//function to save the alert duration field changes
function validateInput() {
  // Get the value of the input field with id
  let alerthr = document.getElementById("alerthour").value;
  let alertmin = document.getElementById("alertmin").value;
  let alertsec = document.getElementById("alertsec").value;
  let text = "";
  timerSoundHr = 0;
  timerSoundMin = 0;
  timerSoundSec = 0;
  //input validation
  if (
    isNaN(alerthr) ||
    isNaN(alertmin) ||
    isNaN(alertsec) ||
    alerthr < 0 ||
    alertmin < 0 ||
    alertmin > 60 ||
    alertsec < 0 ||
    alertsec > 60
  ) {
    text = "Input not valid";
  } else {
    timerSoundHr = alerthr;
    timerSoundMin = alertmin;
    timerSoundSec = alertsec;
    text = "";
    $("#exampleModal").modal("hide");
  }
  document.getElementById("errormsg").innerHTML = text;
}
//function plays the sound at given alert time.
function playSound() {
  if (showAlertSetting == true) {
    if (hr == timerSoundHr && min == timerSoundMin && sec == timerSoundSec) {
      alertSound.play();
    }
  }
}
