'use strict';

var React = require('react');
var SvgObject = require('./SvgObject');
require('styles/SvgLayer.less');

var SvgLayer = React.createClass({
  render: function() {
    var svgLayer = this.props.svgLayer;

    var svgLayerClass = 'SvgLayer';
    if (svgLayer.get('visible')) {
      svgLayerClass += ' showLayer';
    } else {
      svgLayerClass += ' hideLayer';
    }

    if (svgLayer.get('preSelected')) {
      svgLayerClass += ' preSelected';
    }

    // add mask attribute if existed
    var maskAdded = '';
    if (svgLayer.get('maskAdded')) {
      maskAdded = 'url(#' + svgLayer.get('maskAdded') + ')';
    }

    var svgObjects = svgLayer.get('svgObjects');
    return <g className={svgLayerClass} mask={maskAdded}>
            {
              svgObjects.map(function(objectID, i) {
                return <SvgObject key={i} layerID={svgLayer.get('name')} objectID={objectID}></SvgObject>;
              })
            }
          </g>;
  }
});

module.exports = SvgLayer;
