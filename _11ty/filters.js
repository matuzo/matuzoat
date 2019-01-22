const { DateTime } = require("luxon");

module.exports = {
  // Date formatting (machine readable)
  machineDate: dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  },

  // Date formatting (human readable)
  readableDate: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");
    }

    return date.toFormat("d. LLLL yyyy");
  },

  // input to string
  stringify: input => {
    return input + "";
  },

  // Cache-busting for external css and js
  cacheBuster: value => {
    let milliseconds = Date.now();
    return value + "?rev=" + milliseconds;
  } 
}
