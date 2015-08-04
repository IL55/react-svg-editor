'use strict';

var React = require('react');
require('styles/HistorySidebar.less');
var HistoryStore = require('stores/HistoryStore');
var HistoryActions = require('actions/HistoryActions');

var HistorySidebar = React.createClass({
  getInitialState: function() {
    return {historyObj: HistoryStore.getHistory()};
  },
  componentDidMount: function() {
    // the listen function returns a
    // unsubscription convenience functor
    this.unsubscribe =
        HistoryStore.listen(this.onHistoryChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  // The listening callback
  onHistoryChange: function(newObj) {
    this.setState({historyObj: newObj});
  },

  fastBackward: function() {
    HistoryActions.moveHistoryPosition(-10);
  },

  stepBackward: function() {
    HistoryActions.moveHistoryPosition(-1);
  },

  stepForward: function() {
    HistoryActions.moveHistoryPosition(1);
  },

  fastForward: function() {
    HistoryActions.moveHistoryPosition(10);
  },

  render: function() {
    var historyList = this.state.historyObj.get('historyList');
    var historyPosition = this.state.historyObj.get('historyPosition');

    return <div className='HistorySidebar'>
            <div>
              History
            </div>
            <div>
              History size: <strong> {historyList.size} </strong>
            </div>
            <div>
              History position: <strong> {historyPosition} </strong>
            </div>

            <button type="button" className="btn btn-default" onClick={this.fastBackward} title="Go back">
              <span className="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
            </button>

            <button type="button" className="btn btn-default" onClick={this.stepBackward} title="Go back">
              <span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
            </button>

            <button type="button" className="btn btn-default" onClick={this.stepForward} title="Go back">
              <span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
            </button>

            <button type="button" className="btn btn-default" onClick={this.fastForward} title="Go back">
              <span className="glyphicon glyphicon-fast-forward" aria-hidden="true"></span>
            </button>
          </div>;
  }
});

module.exports = HistorySidebar;
