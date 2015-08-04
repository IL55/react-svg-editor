'use strict';
var React = require('react');


var ImagePreview = require('./preview/ImagePreview');
var ImageSidebar = require('./sidebar/ImageSidebar');

var ImageEditor = React.createClass({

  render: function() {
    return <div className='image-editor'>
          <ImageSidebar image={this.props.image}
                        selectedObjectId={this.props.image.get('selectedObjectId')} />
          <ImagePreview image={this.props.image}
                        selectedObjectId={this.props.image.get('selectedObjectId')} />
      </div>;
  }
});

module.exports = ImageEditor;
