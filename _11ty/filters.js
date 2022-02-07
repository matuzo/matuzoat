const { DateTime } = require('luxon');

module.exports = {
  // Date formatting (machine readable)
  machineDate: (dateObj) => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj.split(' GMT')[0], 'yyyy-MM-dd');
    }

    return date.toFormat('yyyy-MM-dd');
  },
  // Date formatting (human readable)
  readableDate: (dateObj) => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(
        dateObj.split(' GMT')[0],
        'ccc LLL dd y hh:mm:ss'
      );
    }

    return date.toFormat('LLLL d., yyyy');
  },
  // Cache-busting for external css and js
  cacheBuster: (value) => {
    let milliseconds = Date.now();
    return value + '?rev=' + milliseconds;
  },

  escapeQuotes: str => {
    return str.replace(/"/g, '\\"');
  },

  replaceNewLines: str => {
    return str.replace(/\r?\n/g, "");
  }
  
};
