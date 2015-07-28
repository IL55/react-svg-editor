'use strict';
var React = require('react');
var ObjectSidebar = require('./ObjectSidebar');
var LayersSidebar = require('./LayersSidebar');


var ImageSidebar = React.createClass({
  render: function() {
    var addObject = this.props.addObject;
    var addTextObject = function() {
      addObject('text');
    };
    var addRectObject = function() {
      addObject('rect');
    };
    return <div className='image-sidebar'>
              <h1>SVG Image Editor</h1>
              <LayersSidebar />
              <div className='add-svg-object'>
                <strong>Add object:</strong>
                <button onClick={addTextObject}>Text</button>
                <button onClick={addRectObject}>Rect</button>
              </div>
              <ObjectSidebar svgObject={this.props.svgObject} updateObject={this.props.updateObject}/>
            </div>;
  }
});

module.exports = ImageSidebar;
