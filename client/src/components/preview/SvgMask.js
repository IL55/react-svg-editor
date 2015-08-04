'use strict';
var React = require('react');
var SvgObject = require('./SvgObject');
require('styles/SvgLayer.less');

var SvgMask = React.createClass({
  render: function() {
    var svgLayer = this.props.svgMask;

    return <mask id={svgLayer.get('name')}>
            {
              svgLayer.get('svgObjects').map(function(l, i) {
                return <SvgObject svgObject={l} key={i} layerID={svgLayer.get('name')} objectID={i}></SvgObject>;
              })
            }
          </mask>;
  }
});

module.exports = SvgMask;
