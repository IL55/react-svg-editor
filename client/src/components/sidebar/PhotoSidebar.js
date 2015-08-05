'use strict';
var React = require('react');
require('styles/PhotoSidebar.less');

var PhotoSidebar = React.createClass({

  render: function() {
    var photo = this.props.photo;
    return <span className="PhotoSidebar">
            <img className="smallIcon" src={photo.get('thumbnail')}></img>
          </span>;
  }
});

module.exports = PhotoSidebar;
