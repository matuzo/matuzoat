const filters = require('./_11ty/filters.js')
const collections = require('./_11ty/collections.js')

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = function(eleventyConfig) {

  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  });

  // Collections
  Object.keys(collections).forEach(collectionName => {
    console.log(collectionName)
    eleventyConfig.addCollection(collectionName, collections[collectionName])
  });

  eleventyConfig.addTransform("lazyload", function(content, outputPath) {
    if( outputPath.includes('/blog/') && !outputPath.includes('/blog/index.html') ) {
      return content.replaceAll(new RegExp('<img src="(.*)"',"i"), '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="$1"');
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addPassthroughCopy("./src/static/min");
  eleventyConfig.addPassthroughCopy("./src/static/favicon");
  eleventyConfig.addPassthroughCopy("./src/static/fonts");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_redirects");
  
  return {
    templateFormats: [
      "md",
      "njk"
    ],

    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

