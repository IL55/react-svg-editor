'use strict';
var React = require('react');
var ObjectSidebar = require('./ObjectSidebar');
var LayersSidebar = require('./LayersSidebar');
var ObjectActions = require('actions/ObjectActions');


var ImageSidebar = React.createClass({
  addTextObject: function() {
      ObjectActions.addNewObjectToLayer('text');
  },
  addRectObject: function() {
    ObjectActions.addNewObjectToLayer('rect');
  },
  render: function() {
    var layers = this.props.image.get('svgLayers');
    var selectedLayer = layers.find(function(l) {
      return l.selected;
    });
    var layerOperationClass;
    if (!selectedLayer ||
        (selectedLayer && selectedLayer.mask)) {
      layerOperationClass = 'hide';
    } else {
      layerOperationClass = 'show';
    }

    return <div className='image-sidebar'>
              <h1>SVG Image Editor</h1>
              <LayersSidebar layers={layers} selectedLayer={selectedLayer} />
              <div className={layerOperationClass}>
                <div>
                  Objects operations
                </div>
                <div className='add-svg-object'>
                  <div>
                    Add object to selected layer:
                  </div>
                  <button type="button" className="btn btn-default" onClick={this.addTextObject} title="New text object">
                    <span className="glyphicon glyphicon-text-color" aria-hidden="true">Text</span>
                  </button>
                  <button type="button" className="btn btn-default" onClick={this.addRectObject} title="New rectangle object">
                    <span className="glyphicon glyphicon-stop" aria-hidden="true">Rect</span>
                  </button>
                </div>
              </div>
              <ObjectSidebar svgObject={this.props.svgObject} />
            </div>;
  }
});

module.exports = ImageSidebar;
