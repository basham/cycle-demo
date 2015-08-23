/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

import {routes} from './routes';

function intent(Router) {
  return {
    transition$: Router.addListener()
  };
}

function model(actions, Router) {
  return actions.transition$.map(({toState, fromState}) => {
    // Since Router5 doesn't allow arbitrary data to be forwarded through it,
    // find the original route object and initiate its handler.
    let route = routes.filter(({name}) => name === toState.name)[0];
    let handler = route.handler();
    let name = toState.name;
    let homeUrl = Router.buildUrl('home');
    let helloUrl = Router.buildUrl('hello');
    return {name, handler, homeUrl, helloUrl};
  });
}

function view(state$) {
  return state$.map(({name, handler, homeUrl, helloUrl}) =>
    <div>
      <p>Hi, {name}</p>
      <a href={homeUrl}>Home</a>
      <a href={helloUrl}>Hello</a>
      {handler}
    </div>
  );
}

export default function main({Router}) {
  let actions = intent(Router);
  let state$ = model(actions, Router);
  let view$ = view(state$);
  return {
    DOM: view$,
    Router: Rx.Observable.from(['start'])
  }
}
