# Work-Day-Scheduler

As a student with a busy day full of assignment deadlines and miscellaneous tasks, it can be difficult to stay organized and remember all the events I have coming up. As a coder who spends my day online studying web developement it is helpful to have a virtual schedule rather than a physical schedule. For these reasons I created a work day scheduler webpage. The webpage is dynamic, giving users the ability to log upcoming events by the hour. It also helps organize ones schedule visually by displaying past hours with a gray background, the current hour with a red background and future hours with a green background.

![Current Day Screenshot]()

The webpage utilizes local storage to ensure that any events that have been added, changed or removed are likewise updated in local storage so when the user closes the webpage and comes back, all events previously saved are still present. The webpage will load with the current day displayed and the user has the ability to change the day at the bottom of the header so they can view past dates and delete old events or go to future dates to create upcoming events and tasks.

Building the webpage was great practice with jQuery syntax and DOM manipulation. It also gave me the opportunity to hone my skills with arrays in order to keep the local storage as clean as possible. Since the local storage only wants to save event data, there are many ways to clutter the stored list by updating events, deleting events or adding events with an empty string description. Rather than continuing to add new events, the code will update or remove pre-existing events in the local storage. The logic was a little tricky to work out at times, but this process ensures nothing will be stored if it is not necessary. 

## Installation

No installation necessary just click the link below to view!

[Click here to go to live link!](https://dmanaglia.github.io/Work-Day-Scheduler/)

## Usage

The virtual scheduler is easy to use and intuitive. When loaded, the webpage will display the current day. Any past hours will be the color gray, the present hour will be red, and future hours will be green. In order to create an event just click on the text are in the middle of each time slot and type in your new event. Once you are finished describing the event be sure to click the save button to the right of the text area. If you save a new event, a confirmation message will appear near the top of the webpage declaring the event has been saved in local storage. If you make any updates to the event or delete it and save the changes, an appropriate confirmation message will be displayed. All confirmation messages will be displayed for exactly five seconds before vanishing.

![Confirmation Screenshot]()

In order to view a date other than today, utilize the "Go To Date" input near the top of the page which will display a calander when clicked so you can navigate to any desired date. Every date follows the same structure and adding or changing any event follows the same rules. Just be sure to save the event before refreshing or exiting the browser!

![DatePicker Screenshot]()

## Cedits

[Bootstrap](https://getbootstrap.com/)

I utilized the bootstrap API for general styling and spacing for my webpage.

[Font Awesome](https://fontawesome.com/)

I utilized the Font Awesome API to add the floppy disk icons that appear on all my save buttons.

[Google Fonts](https://fonts.google.com/)

I utilized the Google Fonts API to use the font 'Open Sans' throughout my webpage.

[day.js.org Formatting](https://day.js.org/docs/en/display/format)

I utilized the Day.js API for efficiency when formatting dates and retrieving specific information of a given date, such as retrieving the name of the day of the week. The API is increadibly handy when building any kind of calander with efficient functionality and clean syntax.

[jQuery Script](https://jquery.com/)

I utilized the jQuery API for a cleaner JavaScript syntax.

[jQuery UI datepicker](https://jqueryui.com/datepicker/)

I utilized the jQuery user interface API for the datepicker widget I placed on my webpage. The API contains both script and stylesheet necessary for the datepicker widget. A very useful widget that easily allows the user to navigate to a date other than today, past or future. 

[tutorialspoint datepicker](https://www.tutorialspoint.com/How-does-jQuery-Datepicker-onchange-event-work)

I struggled with the syntax of jQuery's datepicker, specifically when it came to the widget's build in options. I utilized the website tutorialsPoint to better understand the datepickers 'onSelect' option in order to retrieve data from the datepicker. 

## License

Please refer to the LICENSE in the repo.

## Features

Although it was not necessary for the assignment, I added the datepicker widget to my webpage so that users can add events on future dates and go back and remove events from past dates. The coding wasn't too difficult once I learned the proper syntax for the widget. The desired functionality required me to retrieve the date from the datepicker when the user selects a new date by utilizing the widget's built in option 'onSelect' which requires a function that passes two parameters, the date text "(DD/MM/YYYY)" and an object containing information on the selected date. 

In this way, the 'onSelect' option behaves exactly like an eventlistener. Through use of the Day.js API, I customized my anonymous function to set the global variables I had created that stored the current date to the new date the user had selected. With some simple logic to descern if the user selcted date was in the future or in the past, I was able to set all the necessary variables to the proper values of any date past, present or future and rebuild the webpage to display that date. It wasn't hard to then adjust my event object to also take in the date as a parameter, and then only print events when their date value matched the date of the current page.

Overall the feature adds so much to the webpage and it doesn't change its original functionality. The current date is still the first day to load when a user navigates to the page. The user just now has the option of adding events to days in the future and removing events from the past.

![Past Screenshot]()

![Future Screenshot]()
