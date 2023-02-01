function Event(hour, date, description) {
  this.hour = hour;
  this.date = date;
  this.description = description;
}

allEvents = [];
if(localStorage.getItem("events")){
  allEvents = JSON.parse(localStorage.getItem("events"));
}

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var d = new Date();
var dayOfWeek = d.getDay();
var dayOfMonth = d.getDate();
var monthOfYear = d.getMonth();
var th = "th";
if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
  th = "st";
} else if (dayOfMonth === 2 || dayOfMonth === 22){
  th = "nd";
} else if (dayOfMonth === 3 || dayOfMonth === 23){
  th = "rd"
}
var dateStr = weekdays[dayOfWeek] + ", " + months[monthOfYear] + " " + dayOfMonth + th + ", " + d.getFullYear();
var currentHour = d.getHours();

$(function () {
  var currentDateEl = $("#currentDay");
  currentDateEl.text(dateStr);

  var confirmStored = $('#confirm-message');
  confirmStored.css("text-align", "center");  
  confirmStored.css("visibility", "hidden");  

  
  var mainEl = $("#main");
  
  for(var i = 9; i <= 18; i++) {
    var hourEl = $("<div>");
    hourEl.attr("id", "hour-" + i);
    hourEl.attr("class", "row time-block");
    if(i < currentHour) {
      hourEl.addClass("past");
    } else if (i === currentHour) {
      hourEl.addClass("present");
    } else {
      hourEl.addClass("future");
    }
    var hourLabelEl = $("<div>");
    hourLabelEl.attr("class", "col-2 col-md-1 hour text-center py-3");
    if(i <= 12){
      hourLabelEl.text(i + "AM");
    } else {
      hourLabelEl.text(i - 12 + "PM");
    }
    hourEl.append(hourLabelEl);
  
    var hourTextArea = $("<textarea>");
    hourTextArea.attr("class", "col-8 col-md-10 description");
    hourTextArea.attr("rows", "3");
    hourEl.append(hourTextArea);
  
    var saveBtn = $("<button>");
    saveBtn.attr("class", "btn saveBtn col-2 col-md-1");
    saveBtn.attr("aria-label", "save");
    saveBtn.attr("data-hour", i);
    var italicsEl = $("<i>");
    italicsEl.attr("class", "fas fa-save");
    italicsEl.attr("aria-hidden", "true");
    italicsEl.attr("data-hour", i);
    saveBtn.append(italicsEl);
  
    hourEl.append(saveBtn);
    mainEl.append(hourEl);
  }
  
  if(allEvents != []){
    for(var i = 0; i < allEvents.length; i++){
      $("#hour-" + allEvents[i].hour).children().eq(1).text(allEvents[i].description);
    }
  }
  
  mainEl.on("click", ".saveBtn", function(event){
    var hour = $(event.target).attr("data-hour");
    var description = $("#hour-" + hour).children().eq(1).val();
    console.log(description);
    var newEvent = new Event(hour, dateStr, description);
    var removed = false;
    var changed = false;
    for(var i = 0; i < allEvents.length; i++){
      if(allEvents[i].date === dateStr && allEvents[i].hour === hour){
        if(description){
          allEvents[i].description = description;
          changed = true;
        } else {
          allEvents.splice(i, 1);
          removed = true;
        }
      }
    }
    if(!changed && !removed && description) {
      allEvents.push(newEvent);
      localStorage.setItem("events", JSON.stringify(allEvents));
      confirmMessage(changed, removed);
    } else if(changed || removed) {
      localStorage.setItem("events", JSON.stringify(allEvents));
      confirmMessage(changed, removed);
    }
  });

  function confirmMessage(changed, removed) {
    if(!changed && !removed) {
      confirmStored.text("Appointment added to local storage ✅");
    } else if(changed) {
      confirmStored.text("Appointment updated in local storage ▲");
    } else {
      confirmStored.text("Appointment removed from local storage ❎");
    }
    confirmStored.css("visibility", "visible");
    var secondsLeft = 4;
    var myInterval = setInterval(function() {
      secondsLeft --;
      if(secondsLeft === 0) {
        clearInterval(myInterval);
        confirmStored.css("visibility", "hidden");
      }
    }, 1000)
  }
});