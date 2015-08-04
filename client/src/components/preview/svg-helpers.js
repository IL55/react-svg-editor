'use strict';

var transformFor = function(position) {
  var str = '';
  if(position.get('x') || position.get('y')) {
    str += 'translate(' + (position.get('x')) + ',' + (position.get('y')) + ') ';
  }
  if(position.get('r')) {
    str += 'rotate(' + position.get('r') + ',0,0) ';
  }
  if(position.get('scale')){
    str += 'scale(' + position.get('scale') + ') ';
  }
  return str;
};

exports.transformFor = transformFor;
