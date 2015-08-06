'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');

var PhotosStore = Reflux.createStore({
  /**
   * initial setup
   */
  init: function() {
      this.photosStore = Immutable.fromJS({
        photosList: [
          {
            photoId: 1,
            fullsizeImage: require('../images/photos/chibi.jpg'),
            thumbnail: require('../images/photos/chibi_thumb.jpg')
          },
          {
            photoId: 2,
            fullsizeImage: require('../images/photos/guy.jpg'),
            thumbnail: require('../images/photos/guy_thumb.jpg')
          },
          {
            photoId: 3,
            fullsizeImage: require('../images/photos/mugen.jpg'),
            thumbnail: require('../images/photos/mugen_thumb.jpg')
          },
          {
            photoId: 4,
            fullsizeImage: require('../images/photos/schoolgirl.jpg'),
            thumbnail: require('../images/photos/schoolgirl_thumb.jpg')
          }
        ]
      });
  },

  /**
   * get history list
   */
  getPhotosStore: function() {
    return this.photosStore;
  }
});

module.exports = PhotosStore;
