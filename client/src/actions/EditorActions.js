'use strict';

var Reflux = require('reflux');

var EditorActions = Reflux.createActions([
  'switchToAddRectEditMode',
  'startAddRect',
  'continueAddRect',
  'finishAddRect'
]);
module.exports = EditorActions;
