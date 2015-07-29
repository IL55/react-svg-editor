'use strict';
var React = require('react');
var h = require('./svg-helpers');
var ObjectActions = require('actions/ObjectActions');

var SvgObject = React.createClass({
  handleMouseDown: function() {
    ObjectActions.selectObjectInSelectedLayer(this.props.svgObject);
  },
  render: function() {
    var svgObject = this.props.svgObject;
    var child;
    if (svgObject.type === 'text') {
      child = <text x='0' y='0' textAnchor='middle'>{svgObject.text}</text>;
    } else {
      var pos = svgObject.position;
      var style = { fill: svgObject.fill || 'transparent' };
      child = <rect className={svgObject.className} style={style} x={-pos.width / 2} y={-pos.height / 2} width={pos.width} height={pos.height}></rect>;
    }

    return <g transform={h.transformFor(svgObject.position)} onMouseDown={this.handleMouseDown}>
          {child}
        </g>;
  }
});

module.exports = SvgObject;
