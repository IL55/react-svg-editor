'use strict';
var React = require('react');
var ObjectActions = require('actions/ObjectActions');

var TextObjectSidebar = React.createClass({
  handleChange: function(e) {
    ObjectActions.updateObjectAttributes(this.props.layerID, this.props.objectID, {text: e.target.value});
  },
  render: function() {
    return <dl>
              <dt>Text</dt>
              <dd><input onChange={this.handleChange} value={this.props.svgObject.get('text')}/></dd>
           </dl>;
  }
});

module.exports = TextObjectSidebar;
