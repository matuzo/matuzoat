const htmlmin = require('html-minifier');
const helpers = require('./helpers.js')
var slugify = require('slugify');
var headings = [];

module.exports = {
  lazyload: (content, outputPath) => {
    if( outputPath.includes('/blog/') && !outputPath.includes('/blog/index.html') ) {
      return content.replaceAll(new RegExp('<img src="(.*)>',"i"), '<span class="content__image-wrapper"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="content__image" data-src="$1></span>');
    }
    return content;
  },

  anchors: (content, outputPath) => {
    if( outputPath.includes('/blog/') ) {
      return content.replaceAll(new RegExp("<h2>(.*)</h2>","i"), function(match, heading) {
        var slug = slugify(heading, { lower: true, remove: /[*+~.()'"!?:@]/g });
        headings.push([slug, heading]);
      
        return `<h2 id="${slug}">${heading}</h2>`;
      });
    }
    return content;
  },

  htmlmin: (content, outputPath) => {
    if (process.env.ELEVENTY_ENV === 'production' && outputPath.endsWith('.html')) {
        return htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true
        })
    }
    return content
  }
}
