'use strict';
var React = require('react');
require('styles/ImageSidebar.less');
var selectIcon = require('../../images/select_icon.svg');

var ObjectSidebar = require('./ObjectSidebar');
var LayersSidebar = require('./LayersSidebar');
var EditorActions = require('actions/EditorActions');
var HistorySidebar = require('./HistorySidebar');
var PhotosSidebar = require('./PhotosSidebar');
var EditorStates = require('stores/EditorStates');


var ImageSidebar = React.createClass({
  selectObjectMode: function() {
    EditorActions.switchToSelectObjectEditMode();
  },
  addTextObjectMode: function() {
    EditorActions.switchToAddTextEditMode();
  },
  addRectObjectMode: function() {
    EditorActions.switchToAddRectEditMode();
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

    var editState = this.props.image.get('editState');

    var btnClasses = [
      'btn btn-default', // select
      'btn btn-default', // add text
      'btn btn-default'  // add rect
    ];
    switch(editState) {
      case EditorStates.SELECT_OBJ:
        btnClasses[0] += ' selected-edit-btn';
      break;

      case EditorStates.ADD_TEXT:
        btnClasses[1] += ' selected-edit-btn';
      break;

      case EditorStates.ADD_RECT:
      case EditorStates.ADD_RECT_FIRST_POINT_ADDED:
      case EditorStates.ADD_RECT_SECOND_POINT_ADDED:

        btnClasses[2] += ' selected-edit-btn';
      break;

      default:
      break;
    }

    return <div className='ImageSidebar'>
              <h1>SVG Image Editor</h1>
              <HistorySidebar />
              <LayersSidebar layers={layers} selectedLayer={selectedLayer} />
              <div className={layerOperationClass}>
                <div>
                  Objects operations
                </div>
                <div className='add-svg-object'>
                  <div>
                    Select edit mode:
                  </div>

                  <button type="button" className={btnClasses[0]} onClick={this.selectObjectMode} title="Select object mode">
                    <img src={selectIcon} className='cursor-icon' />
                  </button>
                  <button type="button" className={btnClasses[1]} onClick={this.addTextObjectMode} title="New text mode">
                    <span className="glyphicon glyphicon-text-color" aria-hidden="true">Text</span>
                  </button>
                  <button type="button" className={btnClasses[2]} onClick={this.addRectObjectMode} title="New rectangle mode">
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
