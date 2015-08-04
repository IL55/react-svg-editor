'use strict';
var React = require('react');
var h = require('./svg-helpers');
var ObjectActions = require('actions/ObjectActions');

var SvgObject = React.createClass({
  handleMouseDown: function() {
    ObjectActions.selectObjectInSelectedLayer(this.props.layerID, this.props.objectID, this.props.svgObject);
  },
  render: function() {
    var svgObject = this.props.svgObject;
    var child;
    if (svgObject.get('type') === 'text') {
      child = <text x='0' y='0' textAnchor='middle'>{svgObject.get('text')}</text>;
    } else {
      var pos = svgObject.get('position');
      var style = { fill: svgObject.get('fill') || 'transparent' };
      var width = pos.get('width');
      var height = pos.get('height');
      child = <rect className={svgObject.className} style={style} x={-width / 2} y={-height / 2} width={width} height={height}></rect>;
    }

    return <g transform={h.transformFor(svgObject.get('position'))} onMouseDown={this.handleMouseDown}>
          {child}
        </g>;
  }
});

module.exports = SvgObject;
