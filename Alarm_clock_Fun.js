
// Global Variable

let currentTime = document.getElementById("current-time");
let button = document.getElementById("button");
const activeAlarms = document.querySelector(".activeAlarms");
let alarmList = document.getElementById("alarm-time-week");
let activealarmBody = document.getElementById('alarm-list');
let alarmAray = new Array();
let minutes = null;
let hours = null;
let days = null;
let setTime = null;
let setMinnute = null;
let newFormet = null;
let zone = null;
let getZone = null;

// Function For digital Clock

function adigitialClock() {

  const currentClock = new Date();
  hours = currentClock.getHours();
  minutes = currentClock.getMinutes();
  seconds = currentClock.getSeconds();
  days = currentClock.getDay();


  newFormet = hours > 12 ? "PM" : "AM"
  hours = hours % 12;

  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;


  const clockStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${" " + newFormet}`;
  currentTime.innerText = clockStr;
  setTimeout(adigitialClock, 1);

}

//  function For Select Week

function selectWeekDayes() {
  let selectWeek = [];

  let weeks = document.querySelectorAll(".week-list  div");

  for (let i = 0; i < weeks.length; i++) {

    let click = false;
    weeks[i].addEventListener('click', function () {


      if (click == true) {

        let index = selectWeek.indexOf(this.getAttribute("get-data"));
        console.log(index);
        weeks[i].style.backgroundColor = "white";
        selectWeek.splice(index, 1);
        console.log("inside else" + selectWeek);
        click = false;

      } else {

        weeks[i].style.backgroundColor = "#5413b8";
        selectWeek[i] = this.getAttribute("get-data");
        console.log("inside else" + selectWeek);
        click = true;

      }
    });
  }
  return selectWeek;

}

let value = selectWeekDayes();

//  Add event for set alarm

button.addEventListener("click", function setAlarmTime() {

  console.log(value);
  setTime = document.querySelector("input[name ='hour']").value;
  setMinnute = document.querySelector("input[name = 'min']").value;
  zone = document.querySelectorAll("select[name ='zone']");

  getZone = null;

  for (let i = 0; i < zone.length; i++) {

    getZone = zone[i].value;

  }

  const alarms = {
    "alarmhour": setTime,
    "munite": setMinnute,
    "zone": getZone,
    "week": value.slice(0, value.length),
  };

  console.log(alarmAray);
  console.log(alarms);
  console.log("befor add aarrya");
  if (alarms.alarmhour !== "") {

    alarmAray.push(alarms);

  } else {

    alarmAray.splice(0, 1);

  }

  updateAlarm();

});


console.log(alarmAray);

function updateAlarm() {
  let alarmElements = document.createElement("li");
  // alarmElements.setAttribute('id', 'alarm-time');
  alarmElements.setAttribute('class', 'alarm-color');
  let deleteButton = document.createElement("button");
  alarmElements.innerHTML = "";
  alarmAray.forEach((element, index, array) => {
    if (element.alarmhour != "") {

      alarmElements.innerText = `${element.alarmhour}:${element.munite}: ${element.zone}`;
      deleteButton.innerText = "Delete";
      deleteButton.style.margin = "0px 10px 0px 10px";
      alarmElements.id = index;
      activealarmBody.appendChild(alarmElements);
      alarmElements.appendChild(deleteButton);

      let value = deleteButton.id = index;
      console.log(value);
      deleteButton.id == value ? deleteButton.onclick = () => deleteAlarm(element, value) : console.log("print");

    }

  });

}

function deleteAlarm(element, value) {

  const index = alarmAray.indexOf(element);

  if (index !== -1) {

    console.log(index);
    alarmAray.splice(index, 1);
    console.log(document.getElementById(value));
    activealarmBody.removeChild(document.getElementById(value));

  }

}



function playAlarm() {
  for (let i = 0; i < alarmAray.length; i++) {

    if (hours == alarmAray[i].alarmhour && alarmAray[i].munite == minutes && alarmAray[i].zone == newFormet) {

      for (let w = 0; w < alarmAray[i].week.length; w++) {

        if (alarmAray[i].week[w] == days) {

          console.log(alarmAray[i].week[w]);
          console.log("Print");
          window.alert("Wake up budy!");


        }
      }
    }

  }

}

adigitialClock();
setInterval(playAlarm, 1000);

