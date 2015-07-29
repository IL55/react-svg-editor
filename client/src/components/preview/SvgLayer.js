'use strict';
var React = require('react');
var SvgObject = require('./SvgObject');
require('styles/SvgLayer.less');

var SvgLayer = React.createClass({
  handleMouseDown: function() {
    this.props.selectLayer(this.props.svgLayer);
  },
  render: function() {
    var svgLayer = this.props.svgLayer;

    var svgLayerClass = 'SvgLayer';
    if (svgLayer.visible) {
      svgLayerClass += ' showLayer';
    } else {
      svgLayerClass += ' hideLayer';
    }

    return <g className={svgLayerClass}>
            {
              svgLayer.svgObjects.map(function(l, i) {
                return <SvgObject svgObject={l} key={i} id={i}></SvgObject>;
              })
            }
          </g>;
  }
});

module.exports = SvgLayer;
