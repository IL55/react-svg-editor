'use strict';

describe('SvgLayerDemoApp', () => {
  let React = require('react/addons');
  let SvgLayerDemoApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    SvgLayerDemoApp = require('components/SvgLayerDemoApp.js');
    component = React.createElement(SvgLayerDemoApp);
  });

  it('should create a new instance of SvgLayerDemoApp', () => {
    expect(component).toBeDefined();
  });
});
