'use strict';

var React = require('react');
require('styles/PhotosSidebar.less');
var PhotosStore = require('stores/PhotosStore');
var PhotoSidebar = require('./PhotoSidebar');

var PhotosSidebar = React.createClass({
  getInitialState: function() {
    return {photosStore: PhotosStore.getPhotosStore()};
  },
  componentDidMount: function() {
    // the listen function returns a
    // unsubscription convenience functor
    this.unsubscribe =
        PhotosStore.listen(this.onStoreChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  // The listening callback
  onStoreChange: function(newStore) {
    this.setState({photosStore: newStore});
  },
  render: function() {
    var photosList = this.state.photosStore.get('photosList');

    return <div className='PhotosSidebar'>
            <div>
              Images
            </div>
            <div>
              {
                photosList.map(function(photo, i) {
                  return <PhotoSidebar key={i} photo={photo}></PhotoSidebar>;
                })
              }
            </div>
          </div>;
  }
});

module.exports = PhotosSidebar;
