'use strict';
var React = require('react');

var EmptyObjectSidebar = React.createClass({
  render: function() {
    return <div className='empty-svg-object-controls'>Select a object to edit.</div>;
  }
});

module.exports = EmptyObjectSidebar;
