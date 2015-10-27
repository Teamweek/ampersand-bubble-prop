var test = require('tape');
var State = require('ampersand-state');
var AmpersandBubbleProp = require('../index.js');

var ChildState = State.extend({
  props: {
    name: 'string'
  }
});

var ParentState = State.extend(AmpersandBubbleProp, {
  props: {
    name: 'string',
    childProp: 'state',
  },
  session: {
    sessionProp: 'state',
  },
  derived: {
    derivedProp: {
      deps: ['name'],
      fn: function () {
        var childState = new ChildState({name: 'Derived child state'});
        this.bubbleProp(childState, 'derivedProp');
        return childState;
      }
    }
  },
  initialize: function () {
    this.childProp = new ChildState({name: 'Prop child state'});
    this.bubbleProp(this.childProp, 'childProp');

    this.sessionProp = new ChildState({name: 'Session child state'});
    this.bubbleProp(this.sessionProp, 'sessionProp');
  },
});

var parentState = new ParentState({name: 'Parent State'});

test('Delegate prop change event', function (t) {
  parentState.once('change:childProp.name', function () {
    t.end();
  });
  parentState.childProp.name = 'foo'
});

test('Delegate session change event', function (t) {
  parentState.once('change:sessionProp.name', function () {
    t.end();
  });
  parentState.sessionProp.name = 'foo'
});

test('Delegate derived change event', function (t) {
  parentState.once('change:derivedProp.name', function () {
    t.end();
  });
  parentState.derivedProp.name = 'foo'
});
