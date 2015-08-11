'use strict';
var React = require('react');
var ObjectActions = require('actions/ObjectActions');

var PathObjectSidebar = React.createClass({
  handleChange: function(e) {
    ObjectActions.updateObjectAttributes(this.props.layerID, this.props.objectID, {fill: e.target.value});
  },
  render: function() {
    return <dl>
              <dt>Polygon
                  <span className="badge" title="Number of points in polygon">
                    {this.props.svgObject.get('polygon').size}
                  </span>
                  points
              </dt>
              <dd><input onChange={this.handleChange} value={this.props.svgObject.get('fill')}/></dd>
           </dl>;
  }
});

module.exports = PathObjectSidebar;
