'use strict';
var React = require('react');
require('styles/ControlPathPoint.less');

var EditorStates = require('stores/EditorStates');
var EditorActions = require('actions/EditorActions');

var ControlPathPoint = React.createClass({

  onMouseDown: function() {
    if (this.props.editState === EditorStates.SELECT_OBJ) {
      EditorActions.switchToEditPolygonEditMode(this.props.objectID, this.props.pointID);
    }
  },

  render: function() {
    return <circle className='ControlPathPoint'
          cx={this.props.x}
          cy={this.props.y}
          r={ControlPathPoint.controlPointSize}
          onMouseDown={this.onMouseDown}></circle>;
  }
});

ControlPathPoint.controlPointSize = 5;

module.exports = ControlPathPoint;
