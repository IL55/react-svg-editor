'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');
var HistoryActions = require('actions/HistoryActions');

var HistoryStore = Reflux.createStore({
  /**
   * initial setup
   */
  init: function() {
      this.historyObj = Immutable.Map({
        historyList: Immutable.List([]),
        historyPosition: 1 // begins from 1
      });

      this.listenTo(HistoryActions.addToHistory, this.addToHistory);
      this.listenTo(HistoryActions.moveHistoryPosition, this.moveHistoryPosition);
  },

  /**
   * get history list
   */
  getHistory: function() {
    return this.historyObj;
  },


  /**
   * add new snapshot to history
   * @param  {object} svgImage - image snapshot
   */
  addToHistory: function(svgImage) {
    var historyList = this.historyObj.get('historyList');
    var historyPosition = this.historyObj.get('historyPosition');

    // take first historyPosition elements
    historyList = historyList.take(historyPosition);

    historyList = historyList.push(svgImage);
    historyPosition = historyList.size;

    this.historyObj = this.historyObj.set('historyList', historyList);
    this.historyObj = this.historyObj.set('historyPosition', historyList.size);

    // fire update notification
    this.trigger(this.historyObj);
  },

  /**
   * travel back to history
   * @param  {Number} howManySteps
   */
  moveHistoryPosition: function(howManySteps) {
    var historyPosition = this.historyObj.get('historyPosition') + howManySteps;
    var historyList = this.historyObj.get('historyList');

    if (historyList.size < 1) {
      // cannot move
      return;
    }

    if (historyPosition < 1) {
      historyPosition = 1;
    }

    if (historyPosition > historyList.size) {
      historyPosition = historyList.size;
    }

    this.historyObj = this.historyObj.set('historyPosition', historyPosition);

    // notify ImageStory
    var svgImage = historyList.get(historyPosition - 1);
    HistoryActions.setHistorySnapshotToSvgImage(svgImage);

    // fire update notification
    this.trigger(this.historyObj);
  }
});

module.exports = HistoryStore;
