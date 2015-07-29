'use strict';

var Reflux = require('reflux');

var LayerActions = Reflux.createActions([
  'changeLayerVisibility',
  'selectLayer',
  'preSelectLayer',
  'unPreSelectLayer'
]);
module.exports = LayerActions;
