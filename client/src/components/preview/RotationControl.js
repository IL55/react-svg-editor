'use strict';
var React = require('react');

var ControlPoint = require('./ControlPoint');
var ObjectActions = require('actions/ObjectActions');

var RotationControl = React.createClass({
  handleMouseDown: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.handleDrag(true, this.handleDragMove, this.handleDragEnd, this.refs.container);
  },

  handleDragMove: function(e) {
    var pos = this.props.svgObject.position;

    var dr = Math.atan2(e.svgObjectY, e.svgObjectX) * 360 / 2 / Math.PI + 90;

    var svgObject = this.props.svgObject;
    ObjectActions.rotateObject(svgObject, { r: pos.r + dr });
  },

  handleDragEnd: function() {
    this.props.handleDrag(false);
  },

  render: function() {
    var svgObject = this.props.svgObject;
    //var pos = svgObject.position;

    //var width = svgObject.position.width;
    var height = svgObject.position.height;

    return <g ref='container'>
              <rect className='rotation-line'
                x='0'
                y={-height / 2 - ControlPoint.rotationBarHeight}
                height={ControlPoint.rotationBarHeight}
                width={ControlPoint.lineSize}></rect>
              <ControlPoint x='0'
                y={-height / 2 - ControlPoint.rotationBarHeight}
                onMouseDown={this.handleMouseDown} />
          </g>;
  }
});

module.exports = RotationControl;
