//an event object that stores the date, hour and a description of the the event
//date follows the DD/MM/YYYY format as a string
//hour is a number from 9-17 which represents the hour in the work day the event was saved under
function Event(hour, date, description) {
  this.hour = hour;
  this.date = date;
  this.description = description;
}
//retrieves the local storage variable if there it exists, if it doesnt exist than sets the global variable to an empty array
//all events will be an array of Event objects
allEvents = [];
if(localStorage.getItem("events")){
  allEvents = JSON.parse(localStorage.getItem("events"));
}
//day of the month using the dayjs API syntax
var dayOfMonth = dayjs().$D;
//global variable th is the string that comes after the day of the month when printing the full date to the user
var th = "th";
//simple checks to make sure that the the proper ended is attatched to the day number
if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
  th = "st";
} else if (dayOfMonth === 2 || dayOfMonth === 22){
  th = "nd";
} else if (dayOfMonth === 3 || dayOfMonth === 23){
  th = "rd"
}
//utilizing dayjs API syntax to get the current day as a string in a common formatting
//this is the formatting all dates passed to the event object will have for the date value
var dateStr = dayjs().format('DD/MM/YYYY');
//utilizing dayjs API to get the amound of hours already passed in the day (0-23)
var currentHour = dayjs().$H;

//wraps all code that interacts with the DOM in a call to jQuery
$(function () {
  //retrieves the element with the id 'currentDay' which I added to the html file
  var currentDateEl = $("#currentDay");
  //sets the element to a string that holds the current day's info: dayOfWeek, month day, year (example: 'Wednesday, March 21st, 1999')
  //utilizing dayjs API to get day of the week, month of the year, the previously defined day of month and its appropriate ending and then the year
  currentDateEl.text(dayjs().format('dddd') + ", " + dayjs().format('MMMM') + " " + dayOfMonth + th + ", " + dayjs().format('YYYY'));
  //finds the element with the id 'confirm-message' I added to the html file
  var confirmStored = $('#confirm-message');
  //the element will be displayed above the schedule in the middle once an event is saved so setting the visibility to hidden for clarity
  confirmStored.css("text-align", "center");  
  confirmStored.css("visibility", "hidden");
  //retrieves the div element with the id 'main' which I added to the pre-made div element in the html file for clarity
  var mainEl = $("#main");
  //I added a date picked to the page so user can create events for future days and delete events from past days
  //I coppied the jQuery ui datepicker script code
  $("#datepicker").datepicker({
    //'onSelect' is a prebuilt option of jQuery's datepicker that acts like an event listener
    //onSelect will execute a function and will automatically pass 2 variables, the dateText and the date Object
    //dateText follows the formatting I used from dayjs API above (DD/MM/YYYY) and the date object is all info on the date with specific object value names such as 'selectedDay' used below
    onSelect: function(dateText, inst) {
      //sets the global variable DateStr to the date the user selected in the datepicker since it has the same format
      dateStr = dateText;
      //retrieves the day of month and sets it to the global variable for clarity
      dayOfMonth = inst.selectedDay;
      //re-evalutes the propper ending for the date the same way as above
      th = "th";
      if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
        th = "st";
      } else if (dayOfMonth === 2 || dayOfMonth === 22){
        th = "nd";
      } else if (dayOfMonth === 3 || dayOfMonth === 23){
        th = "rd"
      }
      //changes the currentDate element to the new date the user selected with the datepicker following the same formatting
      currentDateEl.text(dayjs(dateText).format('dddd') + ", " + dayjs(dateText).format("MMMM") + " " + dayOfMonth + th + ", " + inst.selectedYear);
      //simple logic to discern if the date selected is in the future or past when compared to the current date
      //if year is greater it is in the future
      if(inst.selectedYear > dayjs().$y) {
        //if the date is in the future it sets the current hour to an arbitrary number that is only used in the function printWorkDay to compare to the index of the for loop
        //if the day is in the future the current hour can be any number less than 9
        currentHour = -24;
        //if year is the same and month is greater it is in the future
      } else if(inst.selectedYear === dayjs().$y && inst.selectedMonth > dayjs().$M) {
        currentHour = -24;
        //if year and month are both equal and the day is greater than it is again in the future
      } else if(inst.selectedYear === dayjs().$y && inst.selectedMonth === dayjs().$M && inst.selectedDay > dayjs().$D) {
        currentHour = -24;
        //same checks for the past but in reverse
      } else if(inst.selectedYear < dayjs().$y){
        //if the day is in the past current hour can be any number greater than 17
        currentHour = 24;
      } else if(inst.selectedYear === dayjs().$y && inst.selectedMonth < dayjs().$M) {
        currentHour = 24;
      } else if(inst.selectedYear === dayjs().$y && inst.selectedMonth === dayjs().$M && inst.selectedDay < dayjs().$D) {
        currentHour = 24;
      } else {
        //only reaches this else statement if the year, month and day all match the current day so it resets current hour to the actual current hour
        currentHour = dayjs().$H;
      }
      //reloads the work day based on the new date information
      printWorkDay();
    }
  });
  //prints all the hour rows on to the div with id 'main'
  function printWorkDay() {
    //first it removes all child elements from the main element
    mainEl.empty();
    //next loops through a work day (start at 9 for 9am and ends at 17 for 5pm)
    //this way i is always equal to the hour of the row it is creating
    for(var i = 9; i < 18; i++) {
      //creates a new div element
      var hourEl = $("<div>");
      //sets the new div element id to the current hour (hour-9 on first iteration hour-11 on seconds ...)
      hourEl.attr("id", "hour-" + i);
      //sets the new hour element's class to row (bootstrap) and time-block (custom)
      hourEl.attr("class", "row time-block");
      //checks if i is less than, equal to or greater than the current hour
      //if the current hour is greater than i the hour element has to represent the past
      //this is why the current hour declared in the date-picker is arbitrary, if the day was in the past than setting the currentHour to 24 ensures all rows created represent the past
      if(i < currentHour) {
        //utilizing jQuery's addClass as to not override the predetermind classes
        //these classes are custom and defined in the custom styleshee
        hourEl.addClass("past");
      } else if (i === currentHour) {
        hourEl.addClass("present");
      } else {
        hourEl.addClass("future");
      }

      //creates a new div element that is the hour label
      var hourLabelEl = $("<div>");
      //sets appropriate classes defined in bootstrap and custom stylesheet
      hourLabelEl.attr("class", "col-2 col-md-1 hour text-center py-3");
      if(i <= 12){
        //if I is less than 13 than the hour is in the morning
        hourLabelEl.text(i + "AM");
      } else {
        //if i is greater than 12 than it is in the afternoon and I subtract 12 in order to not display military time
        hourLabelEl.text(i - 12 + "PM");
      }
      //appends the hour label element to the hour element
      hourEl.append(hourLabelEl);

      //next creates a text area element
      var hourTextArea = $("<textarea>");
      //assings appropriate classes defined in bootstrap and custom stylesheet
      hourTextArea.attr("class", "col-8 col-md-10 description");
      //assigns appropriate value to the rows attribute
      hourTextArea.attr("rows", "3");
      //appends the text area element to the hour element
      hourEl.append(hourTextArea);

      //creates a new button element
      var saveBtn = $("<button>");
      //assigns appropraite attributes to the button defined in custom and bootstrap stylesheet
      saveBtn.attr("class", "btn saveBtn col-2 col-md-1");
      saveBtn.attr("aria-label", "save");
      //I added a custom attribute to make it easier when I create the eventlistener for this button to know exactly which hour I am targeting
      saveBtn.attr("data-hour", i);
      //creates a new idiomatic text element
      var italicsEl = $("<i>");
      //sets appropriate attributes to the i tag, utilizing Font Awesome API for the floppy disk icon
      italicsEl.attr("class", "fas fa-save");
      italicsEl.attr("aria-hidden", "true");
      //again I added a custom attribute to the i tag since user can press this since it will be on the button
      italicsEl.attr("data-hour", i);
      //appends i tag to the button element
      saveBtn.append(italicsEl);
      //lastsly appends the button to the hour element and appends the hour element to the main element
      hourEl.append(saveBtn);
      mainEl.append(hourEl);
      //then continues to loop through until all hour row elements have been created and added to the page
    }
    //once all elements are on the page the function checks to see if there are any allEvents lists which I retrieved from local storage on line 13
    if(allEvents != []){
      //if the list is not empty it loops through the list
      for(var i = 0; i < allEvents.length; i++){
        //first it checks to see if the current event has the same date value as the date of the page just created
        if(allEvents[i].date === dateStr){
          //if so than it retrieves the hour from the event object and searches for the element with the proper id (for example 'hour-9' if the event is in the 9th hour)
          //next it traverses through the DOM since the elements with hour-i id's are the hour rows themselves and the event description needs to go in the textArea element
          //targets the rows 2nd child (index 1) for the textArea element and sets the textArea inner HTML to that events description
          $("#hour-" + allEvents[i].hour).children().eq(1).text(allEvents[i].description);
        }
      }
    }
  }
  //an event listener attatched to the entire main element that is only triggered if the user clicks on an element with the class 'saveBtn'
  mainEl.on("click", ".saveBtn", function(event){
    //sets a new local variable 'hour' to the custom attribute 'hour' I gave to all the button and i elements
    var hour = $(event.target).attr("data-hour");
    //once I've gotten the hour I want to target search for the element with the specific id name ('hour-9' for example if the hour is 9)
    //it then traverses through the DOM to retrive the textArea element inner HTML value 
    var description = $("#hour-" + hour).children().eq(1).val();
    //creates a new Event Object with the declared hour, date and description
    //this is why the date needs to be global so if it is changed in the datepicker and a new event is saved it will be saved to the proper date
    var newEvent = new Event(hour, dateStr, description);
    //boolean variables than will establish what message to display to the user after they save, change or remove an event
    var removed = false;
    var changed = false;
    var isExactSame = false;
    //I want to check all events already saved in allEvents
    //I want to do this so the local variable is nice and clean and only stores necessary information (if a description is an empty string that object doesn't need to be saved)
    for(var i = 0; i < allEvents.length; i++){
      //checks if the current event in the loop has the same date and hour as the new event but has a different discription
      //in this case the new event won't be added to the event list rather, the event in the list will be update or removed
      if(allEvents[i].date === dateStr && allEvents[i].hour === hour && allEvents[i].description !== description){
        //if the date and hour matches an existing event and the new events description isn't an empty string
        if(description){
          //than rather than adding a whole new object to local storage it changes the pre-existing object's description to the new description
          allEvents[i].description = description;
          //and notes that the event has been changed
          changed = true;
        } else {
          //if the date and hour match a saved event but the new event description is an empty string
          //rather than having an empty event description in storage it just removed that event object from storage
          allEvents.splice(i, 1);
          //and notes that the event has been removed
          removed = true;
        }
        //also checks to see if the new event is the exact same as an event in storage
        //only occurs if the user keeps pressing the save button after adding an event
        //simply to help keep local storage as clean as possible
      } else if(allEvents[i].date === dateStr && allEvents[i].hour === hour && allEvents[i].description === description) {
        isExactSame = true;
      }
    }
    //if the new event has a description and it was not changed and it was not removed and it is not the exact same as an existing event than it is a new event that needs to be added
    if(!changed && !removed && !isExactSame && description) {
      //adds the new event to the end of the allEvents list
      allEvents.push(newEvent);
      //updates local storage
      localStorage.setItem("events", JSON.stringify(allEvents));
      //calls the confirm message function with the arguments changed and removed so the proper message will be displayed
      confirmMessage(changed, removed);
    } else if(changed || removed) {
      //updates local storage
      localStorage.setItem("events", JSON.stringify(allEvents));
      //calls the confirm message function
      confirmMessage(changed, removed);
    } 
    //the event handler will do nothing if the user tries to save a event that doesn't have a description 
    //or if the user tries to save an event that exactly matches an event already saved in storage
  });

  //takes two arguments so the proper message will be displayed to the user
  function confirmMessage(changed, removed) {
    //if it the event wasn't changed or removed that means it was added
    if(!changed && !removed) {
      //updates the confirmStored element declared on line 41
      confirmStored.text("Appointment added to local storage ✅");
    } else if(changed) {
      //updates the confirm element stating the event was changed
      confirmStored.text("Appointment updated in local storage ▲");
    } else {
      //updates the message to say the event was removed
      confirmStored.text("Appointment removed from local storage ❎");
    }
    //changes the confirmStored element to make it visible
    confirmStored.css("visibility", "visible");
    var secondsLeft = 2;
    //starts an iterval that will run for 3 seconds (1 iteration at the start of the interval + the declared 2 seconds left)
    var myInterval = setInterval(function() {
      //subracts 1 from seconds left every iteration
      secondsLeft --;
      //once secondsLeft is zero it stops the interval and resets the element to hidden
      if(secondsLeft === 0) {
        clearInterval(myInterval);
        confirmStored.css("visibility", "hidden");
      }
    }, 1000) //interval loops once every 1000 milliseconds (1 second)
  }
  //when the webpage first loads it will begin by a call to the printWorkDay function 
  printWorkDay();
});