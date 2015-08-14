'use strict';
var React = require('react');
var ObjectActions = require('actions/ObjectActions');
var EditorActions = require('actions/EditorActions');
var curvesIcon = require('../../images/curve_line.png');

var PathObjectSidebar = React.createClass({
  handleChange: function(e) {
    ObjectActions.updateObjectAttributes(this.props.layerID, this.props.objectID, {fill: e.target.value});
  },

  switchToAddCurvePolygonEditMode: function() {
    EditorActions.switchToAddCurvePolygonEditMode();
  },
  render: function() {
    return <dl>
              <dt>Polygon
                  <span className="badge" title="Number of points in polygon">
                    {this.props.svgObject.get('polygon').size}
                  </span>
                  points
              </dt>
              <dd>
                  <input onChange={this.handleChange} value={this.props.svgObject.get('fill')}/>
              </dd>
              <dd>
                <button type="button" className='btn btn-default' onClick={this.switchToAddCurvePolygonEditMode} title="Add polygon curves">
                  <img src={curvesIcon} className='cursor-icon' />
                  <span aria-hidden="true">Edit Curves</span>
                </button>
              </dd>
           </dl>;
  }
});

module.exports = PathObjectSidebar;
