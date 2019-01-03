const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addCollection("speaking_future", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/speaking\//) !== null && item.date >= DateTime.local();
    });
  });

  eleventyConfig.addCollection("speaking_past", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/speaking\//) !== null && item.date < DateTime.local();
    });
  });

  eleventyConfig.addCollection("events", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/events\//) !== null;
    });
  });

  eleventyConfig.addCollection("talks", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/talks\//) !== null;
    });
  });

  eleventyConfig.addCollection("bookmarks", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/bookmarks\//) !== null;
    });
  });

  eleventyConfig.addCollection("publications", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/publications\//) !== null;
    });
  });

  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/blog\//) !== null;
    }).reverse();
  });

  eleventyConfig.addPassthroughCopy("static/img");
  eleventyConfig.addPassthroughCopy("static/min");
  eleventyConfig.addPassthroughCopy("static/favicon");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy(".htaccess");

  function getreadbaleDate(dateObj) {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");
    }

    return date;
  }

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return getreadbaleDate(dateObj).toFormat("d. LLLL yyyy");
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDay", dateObj => {
    return getreadbaleDate(dateObj).toFormat("d.");
  });
  
  // Date formatting (human readable)
  eleventyConfig.addFilter("readableMonth", dateObj => {
    return getreadbaleDate(dateObj).toFormat("LLLL");
  });
  
  
  // Date formatting (human readable)
  eleventyConfig.addFilter("readableYear", dateObj => {
    return getreadbaleDate(dateObj).toFormat("yyyy");
  });
  

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

    // Date formatting (human readable)
    eleventyConfig.addFilter("stringify", dateObj => {
      return dateObj + "";
    });

  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
