'use strict';
var React = require('react');
var ImageStore = require('stores/ImageStore');
var LayerSidebar = require('./LayerSidebar');
require('styles/LayersSidebar.less');

var LayersSidebar = React.createClass({
  render: function() {
    var svgLayers = ImageStore.getImage().svgLayers;
    return <div className='LayersSidebar'>
              <div>
                SVG Layers:
              </div>
              <table>
              {
                svgLayers.map(function(l, i) {
                  return <LayerSidebar svgLayer={l} key={i}></LayerSidebar>;
                })
              }
              </table>
            </div>;
  }
});

module.exports = LayersSidebar;
