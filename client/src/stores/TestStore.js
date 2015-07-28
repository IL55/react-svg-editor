'use strict';

var Reflux = require('reflux');
var Actions = require('actions/ChangeTestActionCreators');


var TestStore = Reflux.createStore({
  listenables: Actions,


});

module.exports = TestStore;
