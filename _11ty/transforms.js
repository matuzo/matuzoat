const helpers = require('./helpers.js')

module.exports = {
  lazyload: (content, outputPath) => {
    if( outputPath.includes('/blog/') && !outputPath.includes('/blog/index.html') ) {
      return content.replaceAll(new RegExp('<img src="(.*)>',"i"), '<span class="content__image-wrapper"><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="content__image" data-src="$1"></span>');
    }
    return content;
  }
}
