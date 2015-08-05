'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');
//var HistoryActions = require('actions/HistoryActions');

var PhotosStore = Reflux.createStore({
  /**
   * initial setup
   */
  init: function() {
      this.photosStore = Immutable.fromJS({
        photosList: [
          {
            photoId: 1,
            fullsizeImage: 'images/photos/chibi.jpg',
            thumbnail: 'images/photos/chibi_thumb.jpg'
          },
          {
            photoId: 2,
            fullsizeImage: 'images/photos/guy.jpg',
            thumbnail: 'images/photos/guy_thumb.jpg'
          },
          {
            photoId: 3,
            fullsizeImage: 'images/photos/mugen.jpg',
            thumbnail: 'images/photos/mugen_thumb.jpg'
          },
          {
            photoId: 4,
            fullsizeImage: 'images/photos/schoolgirl.jpg',
            thumbnail: 'images/photos/schoolgirl_thumb.jpg'
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
