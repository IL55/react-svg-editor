'use strict';
var React = require('react');

var ControlPoint = require('./ControlPoint');
var RotationControl = require('./RotationControl');
var h = require('./svg-helpers');

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
    svgObject.position.x += e.pageX - this.state.lastMouseX;
    svgObject.position.y += e.pageY - this.state.lastMouseY;

    this.props.update(svgObject, {
      position: svgObject.position
    });
    this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY });
  },
  handleResizeStart: function(e) {
    e.stopPropagation();
    this.props.handleDrag(true, this.handleResizeMove, this.handleResizeEnd, this.refs.container);
  },
  handleResizeMove: function(e) {
    var svgObject = this.props.svgObject;
    var pos = svgObject.position;

    var z0 = Math.sqrt(Math.pow(pos.width / 2, 2) + Math.pow(pos.height / 2, 2));
    var z1 = Math.sqrt(Math.pow(e.svgObjectX, 2) + Math.pow(e.svgObjectY, 2));

    pos.scale = (pos.scale || 1) * z1 / z0;

    this.props.update(svgObject, {
      position: svgObject.position
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
    var pos = svgObject.position;

    var width = svgObject.position.width;
    var height = svgObject.position.height;

    var controlPointLocations = [[-width / 2, -height / 2], [width / 2, -height / 2], [-width / 2, height / 2], [width / 2, height / 2]];

    var self = this;
    var controlPoints = controlPointLocations.map(function(location, i){
      return <ControlPoint x={location[0]} y={location[1]} onMouseDown={self.handleResizeStart} key={i} />;
    });

    return <g ref='container' transform={h.transformFor(svgObject.position)} onMouseDown={self.handleMouseDown}>
          <rect className='halo' x={-pos.width / 2} y={-pos.height / 2} width={pos.width} height={pos.height}></rect>

          {controlPoints}

          <RotationControl
            svgObject={svgObject}
            update={this.props.update}
            handleDrag={this.props.handleDrag} />
         </g>;
  }
});

module.exports = ControlObject;
