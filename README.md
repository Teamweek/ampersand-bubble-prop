# ampersand-bubble-prop
Delegate any property event (prop, derived, session etc) of an AmpersandJS state

Ampersand state only delegates events of it's children. This mixin allows to delegate any state property.

```javascript
var AmpersandBubbleProp = require(ampersand-bubble-prop);

var ParentState = State.extend(AmpersandBubbleProp, {
  props: {
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

var state = new ParentState();

// You can now listen to those events:
state.on('change:childProp.prop', function () {});
state.on('change:sessionProp.prop', function () {});
state.on('change:derivedProp.prop', function () {});
```
