'use strict';
var React = require('react');

var ControlPathPoint = require('./ControlPathPoint');
var EditorStates = require('stores/EditorStates');

var ControlPath = React.createClass({
  render: function() {
    var editPolygon = false;
    switch(this.props.editState) {
      case EditorStates.ADD_POLYGON_FIRST_TWO_POINTS_ADDED:
      case EditorStates.ADD_POLYGON_NEXT_POINT_ADDED:
      case EditorStates.EDIT_POLYGON_POINT:
        editPolygon = true;
      break;
    }

    var pathData;
    if (editPolygon) {
      pathData = 'M ' + this.props.polygon.map(function(point) {
        return point.get('x').toString() + ' ' + point.get('y').toString();
      }).join(' L ') + ' Z';
    }
    var objectID = this.props.objectID;
    var editState = this.props.editState;

    return <g>
              <path d={pathData}></path>
              {
                this.props.polygon.map(function(point, i) {
                  return <ControlPathPoint x={point.get('x')} y={point.get('y')} key={i} objectID={objectID} editState={editState} pointID={i}/>;
                })
              }
          </g>;
  }
});


module.exports = ControlPath;
