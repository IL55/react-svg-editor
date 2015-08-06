'use strict';
var React = require('react');
require('styles/PhotoSidebar.less');
var ObjectActions = require('actions/ObjectActions');

var DragSource = require('react-dnd').DragSource;
var PropTypes = React.PropTypes;

/**
 * Implements the drag source contract.
 */
var cardSource = {
  beginDrag: function (props) {
    return {
      photo: props.photo
    };
  },
  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    var photo = monitor.getItem().photo;

    // get coordinates
    // get target rect
    var dropResult = monitor.getDropResult();
    var componentRectTarget = dropResult.componentRectTarget;

    // get client rect
    var componentRect = component.getDOMNode().getBoundingClientRect();
    ObjectActions.addNewObjectToLayer('photo', {
      src: photo.get('fullsizeImage'),
      position: {
        // move according target(top left)
        x: component.props.clientOffset.x - componentRectTarget.left,
        y: component.props.clientOffset.y - componentRectTarget.top,
        width: componentRect.width,
        height: componentRect.height,
        r: 0,
        scale: 1
      }
    });
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    clientOffset: monitor.getClientOffset()
  };
}

var PhotoSidebar = React.createClass({
  propTypes: {
    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  },

  render: function() {
    var photo = this.props.photo;
    var connectDragSource = this.props.connectDragSource;
    return connectDragSource(<img className="PhotoSidebar" src={photo.get('thumbnail')}></img>);
  }
});

module.exports = DragSource('PhotoSidebar', cardSource, collect)(PhotoSidebar);
