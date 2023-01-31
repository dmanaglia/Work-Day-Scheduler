// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


//eventually change to a equation that will retrieve the current hour

var currentHour = 14;

var mainEl = $("#main");
console.log(mainEl);

for(var i = 7; i <= 24; i++) {
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
  var italicsEl = $("<i>");
  italicsEl.attr("class", "fas fa-save");
  italicsEl.attr("aria-hidden", "true");
  saveBtn.append(italicsEl);

  hourEl.append(saveBtn);
  mainEl.append(hourEl);
}


{/* <div id="hour-11" class="row time-block future">
<div class="col-2 col-md-1 hour text-center py-3">11AM</div>
<textarea class="col-8 col-md-10 description" rows="3"> </textarea>
<button class="btn saveBtn col-2 col-md-1" aria-label="save">
  <i class="fas fa-save" aria-hidden="true"></i>
</button>
</div> */}