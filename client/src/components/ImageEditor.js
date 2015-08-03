'use strict';
var React = require('react');


var ImagePreview = require('./preview/ImagePreview');
var ImageSidebar = require('./sidebar/ImageSidebar');

var ImageEditor = React.createClass({

  render: function() {
    return <div className='image-editor'>
          <ImageSidebar image={this.props.image}
                        svgObject={this.props.image.get('selectedObject')} />
          <ImagePreview image={this.props.image}
                        selectedObject={this.props.image.get('selectedObject')} />
      </div>;
  }
});

module.exports = ImageEditor;
