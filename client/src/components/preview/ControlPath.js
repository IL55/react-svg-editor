'use strict';
var React = require('react');

var ControlPathPoint = require('./ControlPathPoint');
var ControlPathCurvePoint = require('./ControlPathCurvePoint');
var EditorStates = require('stores/EditorStates');

var ControlPath = React.createClass({
  render: function() {
    var editPolygon = false;
    switch(this.props.editState) {
      case EditorStates.ADD_POLYGON_FIRST_TWO_POINTS_ADDED:
      case EditorStates.ADD_POLYGON_NEXT_POINT_ADDED:
      case EditorStates.EDIT_POLYGON_POINT:
      case EditorStates.EDIT_POLYGON_CURVE_POINT:
      case EditorStates.ADD_CURVE_TO_POLYGON:
        editPolygon = true;
      break;
    }

    var pathData;
    if (editPolygon) {
      pathData = '';
      this.props.polygon.forEach(function(point) {
        var cmd = point.get('cmd');
        switch(cmd) {
          case 'M': // move
          case 'L': // line
            pathData += cmd + ' ' + point.get('x') + ' ' + point.get('y') + ' ';
          break;
          case 'C':
            pathData += cmd + ' ' + point.get('x1') + ' ' + point.get('y1') + ', ' + point.get('x2') + ' ' + point.get('y2') + ', ' + point.get('x') + ' ' + point.get('y') + ' ';
          break;
        }
      });
      pathData += 'Z';
    }
    var objectID = this.props.objectID;
    var editState = this.props.editState;

    var controlPoints = this.props.polygon.map(function(point, i) {
      var cmd = point.get('cmd');
      var res;
      switch(cmd) {
        case 'M': // move
        case 'L': // line
          res = <ControlPathPoint x={point.get('x')} y={point.get('y')} key={i} objectID={objectID} editState={editState} pointID={i}/>;
        break;

        case 'C':
          res = <g key={i}>
                  <ControlPathPoint x={point.get('x')} y={point.get('y')} objectID={objectID} editState={editState} pointID={i}/>
                  <ControlPathCurvePoint point={point} objectID={objectID} editState={editState} pointID={i} curvePointID="1" />
                  <ControlPathCurvePoint point={point} objectID={objectID} editState={editState} pointID={i} curvePointID="2" />
                </g>;
        break;
      }

      return res;
    });

    return <g>
              <path d={pathData}></path>

              {controlPoints}
          </g>;
  }
});


module.exports = ControlPath;
