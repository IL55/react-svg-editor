'use strict';

var Reflux = require('reflux');

var HistoryActions = Reflux.createActions([
  'moveHistoryPosition',
  'addToHistory',
  'setHistorySnapshotToSvgImage'
]);
module.exports = HistoryActions;
