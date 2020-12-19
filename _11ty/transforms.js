const htmlmin = require('html-minifier');
const helpers = require('./helpers.js');
var slugify = require('slugify');
var headings = [];

module.exports = {
  anchors: (content, outputPath) => {
    if (outputPath.includes('/blog/')) {
      var content_anchors;

      // TODO: Clean this mess up
      content_anchors = content.replaceAll(
        new RegExp('<h2>(.*)</h2>', 'i'),
        function (match, heading) {
          var slug = slugify(heading, {
            lower: true,
            remove: /[*+~.()'"!?:@]/g,
          });
          headings.push([slug, heading]);

          return `<h2 id="${slug}">${heading}</h2>`;
        }
      );

      return content_anchors.replaceAll(
        new RegExp('<h3>(.*)</h3>', 'i'),
        function (match, heading) {
          var slug = slugify(heading, {
            lower: true,
            remove: /[*+~.()'"!?:@]/g,
          });
          headings.push([slug, heading]);

          return `<h3 id="${slug}">${heading}</h3>`;
        }
      );
    }
    return content;
  },

  htmlmin: (content, outputPath) => {
    if (
      process.env.ELEVENTY_ENV === 'production' &&
      outputPath.endsWith('.html')
    ) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  },
};
