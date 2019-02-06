const filters = require('./_11ty/filters.js')
const collections = require('./_11ty/collections.js')
const transforms = require('./_11ty/transforms.js')

const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


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

  // Transforms
  Object.keys(transforms).forEach(transformName => {
    console.log(transformName)
    eleventyConfig.addTransform(transformName, transforms[transformName])
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addPassthroughCopy("./src/static/min");
  eleventyConfig.addPassthroughCopy("./src/static/favicon");
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

