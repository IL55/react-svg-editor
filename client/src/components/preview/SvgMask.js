'use strict';
var React = require('react');
var SvgObject = require('./SvgObject');
require('styles/SvgLayer.less');

var SvgMask = React.createClass({
  render: function() {
    var svgLayer = this.props.svgMask;

    return <mask id={svgLayer.name}>
            {
              svgLayer.svgObjects.map(function(l, i) {
                return <SvgObject svgObject={l} key={i} layerID={svgLayer.name} objectID={i}></SvgObject>;
              })
            }
          </mask>;
  }
});

module.exports = SvgMask;
