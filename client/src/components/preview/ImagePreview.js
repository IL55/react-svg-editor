'use strict';

var React = require('react');

var ControlObject = require('./ControlObject');
var SvgObject = require('./SvgObject');

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

    var selectsvgObject = this.props.selectObject;

    var svgObjects = image.svgObjects.map(function(l, i) {
      return <SvgObject svgObject={l} selectObject={selectsvgObject} key={i}></SvgObject>;
    });

    return <div className='image-preview'>
          <svg ref='svg' className={dragging ? 'dragging' : 'not-dragging'}
              height={image.height} width={image.width}
              onMouseMove={this.state.dragging ? this.handleMouseMove : Function.noop}
              onMouseUp={this.state.dragging ? this.handleMouseUp : Function.noop}>

            {/* image svgObjects */}
            {svgObjects}

            {/* control svgObjects */}
            <ControlObject svgObject={this.props.selectedObject}
              handleDrag={this.handleDrag}
              update={this.props.updateObject}/>
          </svg>
        </div>;
  }
});

module.exports = ImagePreview;
