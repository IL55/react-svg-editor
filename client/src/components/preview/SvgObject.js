'use strict';

var React = require('react');
var h = require('./svg-helpers');
var ObjectActions = require('actions/ObjectActions');
var ImageStore = require('stores/ImageStore');

var SvgObject = React.createClass({
  handleMouseDown: function() {
    ObjectActions.selectObjectInSelectedLayer(this.props.layerID, this.props.objectID, this.props.svgObject);
  },
  render: function() {
    var svgObject = ImageStore.getObjectById(this.props.objectID);
    if (!svgObject) {
      return <g></g>;
    }
    var child;
    var type = svgObject.get('type');
    var pos = svgObject.get('position');
    var style = { fill: svgObject.get('fill') || 'transparent' };
    var width = pos.get('width');
    var height = pos.get('height');
    var x = -width / 2;
    var y = -height / 2;

    if (type === 'text') {
      child = <text x='0' y='0' textAnchor='middle'>{svgObject.get('text')}</text>;
    } else if (type === 'rect') {
      child = <rect className={svgObject.get('className')} style={style} x={x} y={y} width={width} height={height}></rect>;
    } else if (type === 'photo') {
      // due to react doesn't support xlink:href we should do next thing
      // more info here http://stackoverflow.com/questions/26815738/svg-use-tag-and-reactjs
      var imgTag = '<image';
      imgTag += ' xlink:href="' + svgObject.get('src') + '"';
      imgTag += ' x="' + x + '"';
      imgTag += ' y="' + y + '"';
      imgTag += ' width="' + width + '"';
      imgTag += ' height="' + height + '"';
      imgTag += ' />';

      // return element g directly
      return <g transform={h.transformFor(svgObject.get('position'))} onMouseDown={this.handleMouseDown} dangerouslySetInnerHTML={{__html: imgTag }} />;
    } else if (type === 'polygon') {
      var pathData = '';
      svgObject.get('polygon').forEach(function(point) {
        var cmd = point.get('cmd');
        switch(cmd) {
          case 'M': // move
          case 'L': // line
            pathData += cmd + ' ' + point.get('x') + ' ' + point.get('y') + ' ';
          break;
          case 'C':
            pathData += cmd + ' ' + point.get('x1') + ' ' + point.get('y1') + ', ' + point.get('x2') + ' ' + point.get('y2') + ', ' + point.get('x') + ' ' + point.get('y') + ' ';
          break;
        }
      });
      pathData += 'Z';

      child = <path className={svgObject.get('className')} style={style} d={pathData}></path>;
    }

    return <g transform={h.transformFor(svgObject.get('position'))} onMouseDown={this.handleMouseDown}>
          {child}
        </g>;
  }
});


module.exports = SvgObject;
