module.exports = {
  tagList: (collection) => {
    let tagSet = new Set();
    collection.getAllSorted().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;
        if (typeof tags === 'string') {
          tags = [tags];
        }

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  },

  til: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/til\//) !== null;
    });
  },

  speaking_future: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return (
        item.inputPath.match(/^\.\/speaking\//) !== null &&
        item.date >= DateTime.local()
      );
    });
  },

  speaking_past: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return (
        item.inputPath.match(/^\.\/speaking\//) !== null &&
        item.date < DateTime.local()
      );
    });
  },

  events: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/events\//) !== null;
    });
  },

  talks: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/talks\//) !== null;
    });
  },

  bookmarks: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/bookmarks\//) !== null;
    });
  },

  publications: (collection) => {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/publications\//) !== null;
    });
  },
};
