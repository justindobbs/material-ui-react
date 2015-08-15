'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var RfApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    RfApp = require('components/RfApp.js');
    component = React.createElement(RfApp);
  });

  it('should create a new instance of RfApp', function () {
    expect(component).toBeDefined();
  });
});
