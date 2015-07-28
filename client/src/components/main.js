'use strict';

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
