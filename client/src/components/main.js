'use strict';

var SvgLayerDemoApp = require('./SvgLayerDemoApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={SvgLayerDemoApp}>
    <Route name="/" handler={SvgLayerDemoApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
