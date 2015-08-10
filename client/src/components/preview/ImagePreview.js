'use strict';

var React = require('react');

var ControlObject = require('./ControlObject');
var SvgLayer = require('./SvgLayer');
var SvgMask = require('./SvgMask');
var ImageStore = require('stores/ImageStore');
var DropTarget = require('react-dnd').DropTarget;
var EditorActions = require('actions/EditorActions');
var EditorStates = require('stores/EditorStates');

var svgImageTarget = {
  drop: function (props, monitor, component) {
    var componentRectTarget = component.getDOMNode().getBoundingClientRect();
    return { componentRectTarget: componentRectTarget };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


var ImagePreview = React.createClass({
  getInitialState: function() {
    return { dragging: false };
  },
  handleDrag: function(dragging, onMove, onUp, svgObject) {
    this.svgObject = svgObject;
    this.mouseMoveHandler = onMove;
    this.mouseUpHandler = onUp;
    this.setState({ dragging: dragging });
  },
  svgObjectLocation: function(e) {
    if(!this.svgObject) {
      return null;
    }

    var screenPoint = this.getDOMNode().createSVGPoint();
    screenPoint.x = e.pageX;
    screenPoint.y = e.pageY;
    var screenToObject = this.svgObject.getDOMNode().getScreenCTM().inverse();
    var svgObjectPoint = screenPoint.matrixTransform(screenToObject);
    return svgObjectPoint;
  },
  handleMouseMove: function(e) {
    // TODO: use SVGLocatable.getScreenCTM() to provide local coords
    e.canvasX = e.pageX - 272;
    e.canvasY = e.pageY - 30;
    var svgObjectPoint = this.svgObjectLocation(e);
    if(svgObjectPoint) {
      e.svgObjectX = svgObjectPoint.x;
      e.svgObjectY = svgObjectPoint.y;
    }
    this.mouseMoveHandler.apply(null, arguments);
  },
  handleMouseUp: function(e) {
    e.canvasX = e.pageX - 272;
    e.canvasY = e.pageY - 30;
    this.mouseUpHandler.apply(null, arguments);
  },

  onMouseDown: function(e) {
    var image = this.props.image;
    var mousePosition = {
      x: e.pageX - 272,
      y: e.pageY - 30
    };

    switch(image.get('editState')) {
      case EditorStates.ADD_RECT:
        EditorActions.startAddRect(mousePosition);

        e.preventDefault();
        e.stopPropagation();
      break;
      default:
      break;
    }
  },

  onMouseMove: function(e) {

    // TODO: move dragging state to Editor state machine
    if (this.state.dragging) {
      this.handleMouseMove(e);
      return;
    }

    var mousePosition = {
      x: e.pageX - 272,
      y: e.pageY - 30
    };

    var image = this.props.image;
    switch(image.get('editState')) {
      case EditorStates.ADD_RECT_FIRST_POINT_ADDED:
      case EditorStates.ADD_RECT_SECOND_POINT_ADDED:
        EditorActions.continueAddRect(mousePosition);

        e.preventDefault();
        e.stopPropagation();
      break;
      default:
      break;
    }
  },

  onMouseUp: function(e) {
    // TODO: move dragging state to Editor state machine
    if (this.state.dragging) {
      this.handleMouseUp(e);
      return;
    }

    var mousePosition = {
      x: e.pageX - 272,
      y: e.pageY - 30
    };

    var image = this.props.image;
    switch(image.get('editState')) {
      case EditorStates.ADD_RECT_FIRST_POINT_ADDED:
      case EditorStates.ADD_RECT_SECOND_POINT_ADDED:
        EditorActions.finishAddRect(mousePosition);

        e.preventDefault();
        e.stopPropagation();
      break;
      default:
      break;
    }


  },

  render: function() {
    var image = this.props.image;
    var dragging = this.props.dragging;
    var svgLayersOriginal = image.get('svgLayers');

    var svgLayers = svgLayersOriginal.filter(function(l){
      return !l.get('mask');
    }).map(function(l, i) {
      return <SvgLayer svgLayer={l} key={i}></SvgLayer>;
    });

    var svgMasks = svgLayersOriginal.filter(function(l){
      return l.get('mask');
    }).map(function(l, i) {
      return <SvgMask svgMask={l} key={i}></SvgMask>;
    });

    var svgObject;
    var layerID;
    var layer = svgLayersOriginal.find(function(l) {
      return l.get('selected');
    });
    if (layer &&
      (this.props.selectedObjectId !== null)) {
      layerID = layer.get('name');
      svgObject = ImageStore.getObjectById(this.props.selectedObjectId);
    }

    var connectDropTarget = this.props.connectDropTarget;

    switch(image.get('editState')) {
      case EditorStates.ADD_RECT_FIRST_POINT_ADDED:
      case EditorStates.ADD_RECT_SECOND_POINT_ADDED:
        svgObject = image.get('editStateData');
      break;
      default:
      break;
    }



    return connectDropTarget(<svg className={dragging ? 'dragging' : 'not-dragging'}
              height={image.get('height')} width={image.get('width')}
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onMouseMove}
              onMouseUp={this.onMouseUp}>

            <defs>
              {/* image svgLayers */}
              {svgMasks}
            </defs>

            {/* image svgLayers */}
            {svgLayers}

            {/* control svgObjects */}
            <ControlObject svgObject={svgObject} objectID={this.props.selectedObjectId} layerID={layerID}
              handleDrag={this.handleDrag} />
          </svg>);
  }
});

module.exports = DropTarget('PhotoSidebar', svgImageTarget, collect)(ImagePreview);
