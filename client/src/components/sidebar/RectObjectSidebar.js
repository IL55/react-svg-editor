'use strict';
var React = require('react');
var ObjectActions = require('actions/ObjectActions');

var RectObjectSidebar = React.createClass({
  handleChange: function(e) {
    ObjectActions.updateObjectAttributes(this.props.layerID, this.props.objectID, {fill: e.target.value});
  },
  render: function() {
    return <dl>
            <dt>Fill</dt>
            <dd><input onChange={this.handleChange} value={this.props.svgObject.get('fill')}/></dd>
          </dl>;
  }
});

module.exports = RectObjectSidebar;
