const { DateTime } = require("luxon");
const MarkdownIt = require('markdown-it');
var escape = require('escape-html');

module.exports = {
  // Date formatting (machine readable)
  machineDate: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj.split(" GMT")[0], "yyyy-MM-dd");
    }

    return date.toFormat("yyyy-MM-dd");
  },

  // Date formatting (human readable)
  readableDate: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");
    }

    return date.toFormat("LLLL d., yyyy");
  },

  // Date formatting (human readable)
  readableMonth: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");


    return date.toFormat("LLLL, yyyy");
  },

  // input to string
  stringify: input => {
    return input + "";
  },

  // Cache-busting for external css and js
  cacheBuster: value => {
    let milliseconds = Date.now();
    return value + "?rev=" + milliseconds;
  },

  md: value => {
    const md = new MarkdownIt();
    return md.render(value);
  },

  escape: string => {
    return escape(string)
  }
}
