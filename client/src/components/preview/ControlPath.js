'use strict';
var React = require('react');

var ControlPoint = require('./ControlPoint');
var EditorStates = require('stores/EditorStates');

var ControlPath = React.createClass({
  render: function() {
    var editPolygon = false;
    switch(this.props.editState) {
      case EditorStates.ADD_POLYGON_FIRST_TWO_POINTS_ADDED:
      case EditorStates.ADD_POLYGON_NEXT_POINT_ADDED:
        editPolygon = true;
      break;
    }

    var pathData;
    if (editPolygon) {
      pathData = 'M ' + this.props.polygon.map(function(point) {
        return point.get('x').toString() + ' ' + point.get('y').toString();
      }).join(' L ') + ' Z';
    }

    return <g>
              <path d={pathData}></path>
              {
                this.props.polygon.map(function(point, i) {
                  return <ControlPoint x={point.get('x')} y={point.get('y')} key={i}/>;
                })
              }
          </g>;
  }
});


module.exports = ControlPath;
