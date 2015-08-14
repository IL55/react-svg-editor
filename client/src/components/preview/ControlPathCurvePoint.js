'use strict';
var React = require('react');
require('styles/ControlPathCurvePoint.less');

var EditorStates = require('stores/EditorStates');
var EditorActions = require('actions/EditorActions');

var ControlPathCurvePoint = React.createClass({

  onMouseDown: function() {
    switch(this.props.editState) {
      case EditorStates.SELECT_OBJ:
        EditorActions.switchToEditCurvePolygonEditMode(this.props.objectID, this.props.pointID, this.props.curvePointID);
      break;
    }
  },

  render: function() {

    var curvePointID = this.props.curvePointID;
    var curvePoint = {
      x: this.props.point.get('x' + curvePointID),
      y: this.props.point.get('y' + curvePointID)
    };

    var polygon = this.props.polygon;
    var prevPoint;
    var prevPointPos;

    if (this.props.curvePointID === '1') {
      // it is previous point
      var prevPointIndex;
      if (this.props.pointID > 0) {
        prevPointIndex = this.props.pointID - 1;
      } else {
        prevPointIndex = polygon.size - 1;
      }
      prevPoint = polygon.get(prevPointIndex);
    } else {
      // for begin of line it is the same point
      prevPoint = this.props.point;
    }

    prevPointPos = {
      x: prevPoint.get('x'),
      y: prevPoint.get('y')
    };

    return <g>
            <circle className='ControlPathCurvePoint'
              cx={curvePoint.x}
              cy={curvePoint.y}
              r={ControlPathCurvePoint.controlPointSize}
              onMouseDown={this.onMouseDown}>
            </circle>
            <line x1={prevPointPos.x} y1={prevPointPos.y} x2={curvePoint.x} y2={curvePoint.y} className="ControlPathCurvePointLine"/>
          </g>;
  }
});

ControlPathCurvePoint.controlPointSize = 5;

module.exports = ControlPathCurvePoint;
