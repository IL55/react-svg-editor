'use strict';

var React = require('react');
var SvgObject = require('./SvgObject');
require('styles/SvgLayer.less');

var SvgLayer = React.createClass({
  render: function() {
    var svgLayer = this.props.svgLayer;

    var svgLayerClass = 'SvgLayer';
    if (svgLayer.visible) {
      svgLayerClass += ' showLayer';
    } else {
      svgLayerClass += ' hideLayer';
    }

    if (svgLayer.preSelected) {
      svgLayerClass += ' preSelected';
    }

    // add mask attribute if existed
    var maskAdded = '';
    if (svgLayer.maskAdded) {
      maskAdded = 'url(#' + svgLayer.maskAdded + ')';
    }

    return <g className={svgLayerClass} mask={maskAdded}>
            {
              svgLayer.svgObjects.map(function(l, i) {
                return <SvgObject svgObject={l} key={i} layerID={svgLayer.name} objectID={i}></SvgObject>;
              })
            }
          </g>;
  }
});

module.exports = SvgLayer;
