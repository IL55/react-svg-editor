'use strict';
var React = require('react');

var ControlPoint = require('./ControlPoint');
var RotationControl = require('./RotationControl');
var h = require('./svg-helpers');
var ObjectActions = require('actions/ObjectActions');

var ControlObject = React.createClass({
  getInitialState: function() {
    return { mouseDown: false, lastMouseX: 0, lastMouseY: 0 };
  },
  handleMouseDown: function(e) {
    this.props.handleDrag(true, this.handleMouseMove, this.handleMouseUp);
    this.setState({ mouseDown: true, lastMouseX: e.pageX, lastMouseY: e.pageY });
  },
  handleMouseUp: function() {
    this.setState({ mouseDown: false });
    this.props.handleDrag(false);
  },
  handleMouseMove: function(e) {
    var svgObject = this.props.svgObject;

    ObjectActions.moveObject(this.props.layerID, this.props.objectID, {
      x: svgObject.get('position').get('x') + e.pageX - this.state.lastMouseX,
      y: svgObject.get('position').get('y') + e.pageY - this.state.lastMouseY
    });

    this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY });
  },
  handleResizeStart: function(e) {
    e.stopPropagation();
    this.props.handleDrag(true, this.handleResizeMove, this.handleResizeEnd, this.refs.container);
  },
  handleResizeMove: function(e) {
    var svgObject = this.props.svgObject;
    var pos = svgObject.get('position');

    var z0 = Math.sqrt(Math.pow(pos.get('width') / 2, 2) + Math.pow(pos.get('height') / 2, 2));
    var z1 = Math.sqrt(Math.pow(e.svgObjectX, 2) + Math.pow(e.svgObjectY, 2));

    ObjectActions.scaleObject(this.props.layerID, this.props.objectID, {
      scale: (pos.get('scale') || 1) * z1 / z0
    });
  },
  handleResizeEnd: function() {
    this.props.handleDrag(false);
  },
  render: function() {
    if(!this.props.svgObject) {
      return <g></g>;
    }

    var svgObject = this.props.svgObject;
    var pos = svgObject.get('position');

    var width = pos.get('width');
    var height = pos.get('height');

    var controlPointLocations = [[-width / 2, -height / 2], [width / 2, -height / 2], [-width / 2, height / 2], [width / 2, height / 2]];

    var self = this;
    var controlPoints = controlPointLocations.map(function(location, i){
      return <ControlPoint x={location[0]} y={location[1]} onMouseDown={self.handleResizeStart} key={i} />;
    });

    return <g ref='container' transform={h.transformFor(pos)} onMouseDown={self.handleMouseDown}>
          <rect className='halo' x={-width / 2} y={-height / 2} width={width} height={height}></rect>

          {controlPoints}

          <RotationControl
            svgObject={svgObject}
            layerID={this.props.layerID}
            objectID={this.props.objectID}
            handleDrag={this.props.handleDrag} />
         </g>;
  }
});

module.exports = ControlObject;
