'use strict';
var React = require('react');

var h = require('./svg-helpers');
/*
var TextLayer = exports.TextLayer = React.createClass({
  render: function() {
    var layer = this.props.layer;
    //var pos = layer.position;
    return <text x='0' y='0' textAnchor='middle'>{layer.text}</text>;
  }
});

var RectLayer = exports.RectLayer = React.createClass({
  render: function() {
    var layer = this.props.layer;
    var pos = layer.position;
    var style = { fill: layer.fill || 'transparent' };
    return <rect className={layer.className} style={style} x={-pos.width / 2} y={-pos.height / 2} width={pos.width} height={pos.height}></rect>;
  }
});
*/
var Layer = React.createClass({
  handleMouseDown: function() {
    this.props.selectLayer(this.props.layer);
  },
  render: function() {
    var layer = this.props.layer;
    var child;
    if (layer.type === 'text') {
      child = <text x='0' y='0' textAnchor='middle'>{layer.text}</text>;
    } else {
      var pos = layer.position;
      var style = { fill: layer.fill || 'transparent' };
      child = <rect className={layer.className} style={style} x={-pos.width / 2} y={-pos.height / 2} width={pos.width} height={pos.height}></rect>;
    }

    return <g transform={h.transformFor(layer.position)} onMouseDown={this.handleMouseDown}>
          {child}
        </g>;
  }
});

module.exports = Layer;
