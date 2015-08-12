'use strict';

var Reflux = require('reflux');

var EditorActions = Reflux.createActions([
  'switchToSelectObjectEditMode',
  'switchToAddRectEditMode',
  'startAddRect',
  'continueAddRect',
  'finishAddRect',
  'switchToAddTextEditMode',
  'addNewTextToPosition',
  'switchToAddPolygonEditMode',
  'startAddPolygon',
  'continueAddPolygon',
  'changePositionForLastPolygonPoint',
  'finishAddPolygon',
  'switchToEditPolygonEditMode',
  'movePointPolygonEditMode',
  'finishEditPointPolygonEditMode'
]);

module.exports = EditorActions;
