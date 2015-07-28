'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import TestComponent from 'components/TestComponent.js';

describe('TestComponent', () => {
    let TestComponentComponent;

    beforeEach(() => {
        TestComponentComponent = createComponent(TestComponent);
    });

    it('should have its component name as default className', () => {
        expect(TestComponentComponent._store.props.className).toBe('TestComponent');
    });
});
