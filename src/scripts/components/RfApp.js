'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../../styles/main.css');

var RfApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
				<button>b</button>
        <ReactTransitionGroup transitionName="fade">
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = RfApp;
