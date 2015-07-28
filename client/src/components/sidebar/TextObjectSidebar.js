'use strict';
var React = require('react');

var TextObjectSidebar = React.createClass({
  handleChange: function(e) {
    this.props.updateObject(this.props.svgObject, {text: e.target.value});
  },
  render: function() {
    return <dl>
              <dt>Text</dt>
              <dd><input onChange={this.handleChange} value={this.props.svgObject.text}/></dd>
           </dl>;
  }
});

module.exports = TextObjectSidebar;
