'use strict';
var React = require('react');
var LayerSidebar = require('./LayerSidebar');


var ImageSidebar = React.createClass({
  render: function() {
    var addLayer = this.props.addLayer;
    var addTextLayer = function() {
      addLayer('text');
    };
    var addRectLayer = function() {
      addLayer('rect');
    };
    return <div className='image-sidebar'>
              <h1>SVG Image Editor</h1>
              <div className='add-layer'>
                <strong>Add layer: </strong>
                <button onClick={addTextLayer}>Text</button>
                <button onClick={addRectLayer}>Rect</button>
              </div>
              <LayerSidebar layer={this.props.layer} updateLayer={this.props.updateLayer}/>
            </div>;
  }
});

module.exports = ImageSidebar;
