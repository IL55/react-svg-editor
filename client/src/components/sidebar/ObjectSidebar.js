'use strict';
var React = require('react');

var EmptyObjectSidebar = require('./EmptyObjectSidebar');

var TextObjectSidebar = require('./TextObjectSidebar');
var RectObjectSidebar = require('./RectObjectSidebar');

var ObjectSidebar = React.createClass({

  render: function() {
    var svgObject = this.props.svgObject;
    var svgObjectControls = EmptyObjectSidebar;
    if (svgObject && svgObject.type) {
      if (svgObject.type === 'text') {
        svgObjectControls = <TextObjectSidebar svgObject={svgObject} />;
      } else {
        svgObjectControls = <RectObjectSidebar svgObject={svgObject} />;
      }
    }
    return <div className='svg-object-controls'>{svgObjectControls}</div>;
  }
});

module.exports = ObjectSidebar;
