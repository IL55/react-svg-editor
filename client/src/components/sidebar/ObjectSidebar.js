'use strict';
var React = require('react');

var EmptyObjectSidebar = require('./EmptyObjectSidebar');

var TextObjectSidebar = require('./TextObjectSidebar');
var RectObjectSidebar = require('./RectObjectSidebar');
var ImageStore = require('stores/ImageStore');

var ObjectSidebar = React.createClass({

  render: function() {
    var selectedObjectId = this.props.selectedObjectId;
    var svgObject = ImageStore.getObjectById(selectedObjectId);

    var svgObjectControls = EmptyObjectSidebar;
    if (svgObject && svgObject.get('type')) {
      if (svgObject.get('type') === 'text') {
        svgObjectControls = <TextObjectSidebar svgObject={svgObject} objectID={selectedObjectId} layerID={this.props.layerID}/>;
      }
      if (svgObject.get('type') === 'rect'){
        svgObjectControls = <RectObjectSidebar svgObject={svgObject} objectID={selectedObjectId} layerID={this.props.layerID}/>;
      }
    }
    return <div className='svg-object-controls'>{svgObjectControls}</div>;
  }
});

module.exports = ObjectSidebar;
