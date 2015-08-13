'use strict';
var React = require('react');
require('styles/ControlPathCurvePoint.less');

var EditorStates = require('stores/EditorStates');
var EditorActions = require('actions/EditorActions');

var ControlPathCurvePoint = React.createClass({

  onMouseDown: function() {
    if (this.props.editState === EditorStates.SELECT_OBJ) {
      EditorActions.switchToEditCurvePolygonEditMode(this.props.objectID, this.props.pointID, this.props.curvePointID);
    }
  },

  render: function() {

    var curvePointID = this.props.curvePointID;
    var curvePoint = {
      x: this.props.point.get('x' + curvePointID),
      y: this.props.point.get('y' + curvePointID)
    };

    return <circle className='ControlPathCurvePoint'
          cx={curvePoint.x}
          cy={curvePoint.y}
          r={ControlPathCurvePoint.controlPointSize}
          onMouseDown={this.onMouseDown}></circle>;
  }
});

ControlPathCurvePoint.controlPointSize = 5;

module.exports = ControlPathCurvePoint;
