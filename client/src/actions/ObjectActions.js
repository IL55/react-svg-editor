'use strict';

var Reflux = require('reflux');

var ObjectActions = Reflux.createActions([
  'addNewObjectToLayer',
  'updateObjectAttributes',
  'moveObject',
  'scaleObject',
  'rotateObject',
  'selectObjectInSelectedLayer'
]);
module.exports = ObjectActions;
