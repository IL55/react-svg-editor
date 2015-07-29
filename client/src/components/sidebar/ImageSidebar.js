'use strict';
var React = require('react');
var ObjectSidebar = require('./ObjectSidebar');
var LayersSidebar = require('./LayersSidebar');
var ObjectActions = require('actions/ObjectActions');


var ImageSidebar = React.createClass({
  render: function() {
    var addTextObject = function() {
      ObjectActions.addNewObjectToLayer('text');
    };
    var addRectObject = function() {
      ObjectActions.addNewObjectToLayer('rect');
    };
    return <div className='image-sidebar'>
              <h1>SVG Image Editor</h1>
              <LayersSidebar />
              <div className='add-svg-object'>
                <div>
                  <strong>Add object to selected layer:</strong>
                </div>
                <button onClick={addTextObject}>Text</button>
                <button onClick={addRectObject}>Rect</button>
              </div>
              <ObjectSidebar svgObject={this.props.svgObject} />
            </div>;
  }
});

module.exports = ImageSidebar;
