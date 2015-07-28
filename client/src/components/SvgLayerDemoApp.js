'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.css');


var ImageEditor = require("./ImageEditor");

var initialImage = {
  width: 800,
  height: 600,
  layers: [
    { type: "text", position: { scale: 1, x: 400, y: 300, r: 20, width: 200, height: 100 }, text: "Simple text 1"},
    { type: "text", position: { scale: 1.6, x: 400, y: 200, r: 90, width: 200, height: 100 }, text: "Long long text 2"},
    { type: "rect", position: { scale: 1, x: 20, y: 20, r: 50, width: 20, height: 50 }, fill: "green" },
    { type: "rect", position: { scale: 1, x: 320, y: 520, r: 150, width: 120, height: 250 }, fill: "black" }
  ]
};


var SvgLayerDemoApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <ImageEditor initialImage={initialImage}/>
      </div>
    );
  }
});

module.exports = SvgLayerDemoApp;
