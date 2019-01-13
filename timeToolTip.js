//Time Tool Tip v1

//Purpose:
//Shows the event time details in the tool tip

//Action Type: Event on Hovor
//Prevent Default Action: No

//More info on Before Event Save actions and objects here:
//https://docs.dayback.com/article/124-action-objects-methods


initialize(event);

function initialize(event) {
  var city;
  var fullFormat = 'h:mma [on] ddd';
  var shortFormat = 'h:mma';

  // You can set up different timezones here
  var timeZones = {
    newYork: {
      name: "New York",
      time: event.start.clone().tz('America/New_York')
    },
    london: {
      name: "London",
      time: event.start.clone().tz('Europe/London')
    },
    tokyo: {
      name: "Tokyo",
      time: event.start.clone().tz('Asia/Tokyo')
    },
  };

  // Shows the differenece of the events in as soon as minutes
  var timeStart = event.start.diff(moment(), 'minutes');

  // What will show on the toolTip depending what timeStart difference has
  var toolTipContent;
  if (timeStart < -1) {
    toolTipContent = 'Occurred ' + event.start.fromNow();
  } else if (timeStart > 1) {
    toolTipContent = 'Upcoming ' + event.start.fromNow();
  } else {
    toolTipContent = 'Starting now';
  }

  // Do not change after this line
  // For allDay event shows only in current time. Othervise, toolTip will show the cities and times for the event
  if (event.allDay) {
    toolTipContent =
      '<div class = "timeToolTip toolTipHeader">' +
      toolTipContent +
      '</div>';
  } else {
    toolTipContent =
      '<div class = "timeToolTip toolTipHeader">' +
      toolTipContent +
      '</div>';
    // If the date of the event is different, it will show the weekday of this event is occuring
    for (city in timeZones) {
      var timeZone = timeZones[city];
      if (event.start.day() === timeZone.time.day()) {
        timeZone.label = timeZone.time.format(shortFormat);
      } else {
        timeZone.label = timeZone.time.format(fullFormat);
      }
      toolTipContent +=
        '<div class="row">' +
        '<div class="col-xs-5 timeToolTip toolTipContent">' +
        timeZones[city].name + ':' +
        '</div>' +
        '<div class = "col-xs-7 toolTipTimeZone">' +
        timeZones[city].label +
        '</div>' +
        '</div>';
    }
  }

  // Tooltip function
  dbk.tooltip(toolTipContent);
}
