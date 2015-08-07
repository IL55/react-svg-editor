'use strict';
var React = require('react');
var ObjectSidebar = require('./ObjectSidebar');
var LayersSidebar = require('./LayersSidebar');
var ObjectActions = require('actions/ObjectActions');
var HistorySidebar = require('./HistorySidebar');
var PhotosSidebar = require('./PhotosSidebar');

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
      return l.get('selected');
    });
    var layerOperationClass;
    if (!selectedLayer ||
        (selectedLayer && selectedLayer.get('mask'))) {
      layerOperationClass = 'hide';
    } else {
      layerOperationClass = 'show';
    }

    var layerID;
    if (selectedLayer &&
      (this.props.selectedObjectId !== null)) {
      layerID = selectedLayer.get('name');
    }

    return <div className='image-sidebar'>
              <h1>SVG Image Editor</h1>
              <HistorySidebar />
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
              <div className={layerOperationClass}>
                <PhotosSidebar />
              </div>
              <ObjectSidebar selectedObjectId={this.props.selectedObjectId} layerID={layerID} />
            </div>;
  }
});

module.exports = ImageSidebar;
