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
            fullsizeImage: 'images/photos/chibi.jpg',
            thumbnail: 'images/photos/chibi_thumb.jpg'
          },
          {
            fullsizeImage: 'images/photos/guy.jpg',
            thumbnail: 'images/photos/guy_thumb.jpg'
          },
          {
            fullsizeImage: 'images/photos/mugen.jpg',
            thumbnail: 'images/photos/mugen_thumb.jpg'
          },
          {
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
