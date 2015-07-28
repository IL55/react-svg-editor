'use strict';
var React = require('react');

var EmptyLayerSidebar = require('./EmptyLayerSidebar');

var TextLayerSidebar = require('./TextLayerSidebar');
var RectLayerSidebar = require('./RectLayerSidebar');

var LayerSidebar = React.createClass({

  render: function() {
    var layer = this.props.layer;
    var layerControls = EmptyLayerSidebar;
    if (layer && layer.type) {
      if (layer.type === 'text') {
        layerControls = <TextLayerSidebar layer={layer} updateLayer={this.props.updateLayer} />;
      } else {
        layerControls = <RectLayerSidebar layer={layer} updateLayer={this.props.updateLayer} />;
      }
    }
    return <div className='layer-controls'>{layerControls}</div>;
  }
});

module.exports = LayerSidebar;
