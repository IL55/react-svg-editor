'use strict';

var React = require('react');

var ControlObject = require('./ControlObject');
var SvgLayer = require('./SvgLayer');
var SvgMask = require('./SvgMask');

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

    var screenPoint = this.refs.svg.getDOMNode().createSVGPoint();
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
  render: function() {
    var image = this.props.image;
    var dragging = this.props.dragging;
    var svgLayersOriginal = image.get('svgLayers');

    var svgLayers = svgLayersOriginal.filter(function(l){
      return !l.mask;
    }).map(function(l, i) {
      return <SvgLayer svgLayer={l} key={i}></SvgLayer>;
    });

    var svgMasks = svgLayersOriginal.filter(function(l){
      return (l.mask === true);
    }).map(function(l, i) {
      return <SvgMask svgMask={l} key={i}></SvgMask>;
    });

    return <div className='image-preview'>
          <svg ref='svg' className={dragging ? 'dragging' : 'not-dragging'}
              height={image.get('height')} width={image.get('width')}
              onMouseMove={this.state.dragging ? this.handleMouseMove : Function.noop}
              onMouseUp={this.state.dragging ? this.handleMouseUp : Function.noop}>

            <defs>
              {/* image svgLayers */}
              {svgMasks}
            </defs>

            {/* image svgLayers */}
            {svgLayers}

            {/* control svgObjects */}
            <ControlObject svgObject={this.props.selectedObject}
              handleDrag={this.handleDrag} />
          </svg>
        </div>;
  }
});

module.exports = ImagePreview;
