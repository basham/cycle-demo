/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {routes, handlers} from './routes';

function intent(Router) {
  return {
    transition$: Router.addListener()
  };
}

function model(actions, sources) {
  return actions.transition$.map(({toState, fromState}) => {
    // Since Router5 doesn't allow arbitrary data to be forwarded through it,
    // find and initiate the route's handler.
    let routeName = toState.name;
    let handler = handlers[routeName];
    let content = handler(sources);
    return {routeName, content};
  });
}

function view(state$, Router) {
  return state$.map(({routeName, content}) =>
    <div>
      <p>Hi, {routeName}</p>
      <a href={Router.buildUrl('home')}>Home</a>
      <a href={Router.buildUrl('hello')}>Hello</a>
      {content}
    </div>
  );
}

export default function main(sources) {
  let {Router} = sources;
  let actions = intent(Router);
  let state$ = model(actions, sources);
  let view$ = view(state$, Router);
  return {
    DOM: view$,
    Router: Rx.Observable.from(['start'])
  }
}
