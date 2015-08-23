/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {routes} from './routes';

function intent(Router) {
  return {
    transition$: Router.addListener()
  };
}

function model(actions) {
  return actions.transition$.map(({toState, fromState}) => {
    // Since Router5 doesn't allow arbitrary data to be forwarded through it,
    // find the original route object and initiate its component.
    let route = routes.filter(({name}) => name === toState.name)[0];
    let component = route.component();
    let name = toState.name;
    return {name, component};
  });
}

function view(state$) {
  return state$.map(({name, component}) =>
    <div>
      <p>Hi, {name}</p>
      <a href="#/">Home</a>
      <a href="#/hello">Hello</a>
      {component}
    </div>
  );
}

export default function main({Router}) {
  return {
    DOM: view(model(intent(Router))),
    Router: Rx.Observable.from(['start'])
  }
}
