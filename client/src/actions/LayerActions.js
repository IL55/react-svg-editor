'use strict';

var Reflux = require('reflux');

var LayerActions = Reflux.createActions([
  'changeLayerVisibility',
  'selectLayer',
  'preSelectLayer',
  'unPreSelectLayer',
  'moveUpSelectedLayer',
  'moveDownSelectedLayer',
  'deleteSelectedLayer',
  'addNewLayer',
  'createMaskFromSelectedLayer',
  'applyMaskToLayer'
]);
module.exports = LayerActions;
