'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');


var ImageEditor = require('./ImageEditor');
var ImageStore = require('../stores/ImageStore');

var SvgEditLayersApp = React.createClass({
  getInitialState: function() {
    return {image: ImageStore.getImage()};
  },
  componentDidMount: function() {
    // the listen function returns a
    // unsubscription convenience functor
    this.unsubscribe =
        ImageStore.listen(this.onImageChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  // The listening callback
  onImageChange: function(newImage) {
    this.setState({image: newImage});
  },

  render: function() {
    return (
      <div className='main'>
        <ImageEditor initialImage={this.state.image}/>
      </div>
    );
  }
});

module.exports = SvgEditLayersApp;
