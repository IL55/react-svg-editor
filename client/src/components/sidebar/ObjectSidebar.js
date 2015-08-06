'use strict';
var React = require('react');

var EmptyObjectSidebar = require('./EmptyObjectSidebar');

var TextObjectSidebar = require('./TextObjectSidebar');
var RectObjectSidebar = require('./RectObjectSidebar');

var ObjectSidebar = React.createClass({

  render: function() {
    //var selectedObjectId = this.props.selectedObjectId;
    var svgObject = this.props.svgObject;

    var svgObjectControls = EmptyObjectSidebar;
    if (svgObject && svgObject.get('type')) {
      if (svgObject.get('type') === 'text') {
        svgObjectControls = <TextObjectSidebar svgObject={svgObject} objectId={this.props.objectId} layerId={this.props.layerId}/>;
      }
      if (svgObject.get('type') === 'rect'){
        svgObjectControls = <RectObjectSidebar svgObject={svgObject} objectId={this.props.objectId} layerId={this.props.layerId}/>;
      }
    }
    return <div className='svg-object-controls'>{svgObjectControls}</div>;
  }
});

module.exports = ObjectSidebar;
