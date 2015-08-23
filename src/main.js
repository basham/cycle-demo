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
    // find the original route object and initiate its handler.
    let route = routes.filter(({name}) => name === toState.name)[0];
    let handler = route.handler();
    let name = toState.name;
    return {name, handler};
  });
}

function view(state$, Router) {
  return state$.map(({name, handler}) =>
    <div>
      <p>Hi, {name}</p>
      <a href={Router.buildUrl('home')}>Home</a>
      <a href={Router.buildUrl('hello')}>Hello</a>
      {handler}
    </div>
  );
}

export default function main({Router}) {
  let actions = intent(Router);
  let state$ = model(actions);
  let view$ = view(state$, Router);
  return {
    DOM: view$,
    Router: Rx.Observable.from(['start'])
  }
}
