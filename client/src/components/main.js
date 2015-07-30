'use strict';

// Load in SVGDOMPropertyConfig before loading React ever and set up custom properties
var SVGDOMPropertyConfig = require('react/lib/SVGDOMPropertyConfig');
var DOMProperty = require('react/lib/DOMProperty');

SVGDOMPropertyConfig.DOMAttributeNames.mask = 'mask';
SVGDOMPropertyConfig.Properties.mask = DOMProperty.injection.MUST_USE_ATTRIBUTE;


var SvgEditLayersApp = require('./SvgEditLayersApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={SvgEditLayersApp}>
    <Route name="/" handler={SvgEditLayersApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
