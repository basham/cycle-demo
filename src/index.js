/** @jsx hJSX */
import {run, Rx} from '@cycle/core';
import {makeDOMDriver, h, hJSX} from '@cycle/dom';
import makeRouterDriver from 'cycle-director';

import Search from './Search';

if(module.hot) {
  module.hot.accept();
}

let routes = [
  {
    url: '/',
    on: () => { return h('search') },
    name: 'Home'
  },
  {
    url: '/hello',
    on: () => { return h('h2', 'another route!') },
    name: 'HELLO, YOU!'
  }
];

function view(output) {
  return (
    <div>
      <p>Oh, hi</p>
      <a href="#/">Home</a>
      <a href="#/hello">Hello</a>
      {output}
    </div>
  );
}

function main({DOM, Router}) {
  let route$ = Rx.Observable.from(routes);
  let view$ = Router
    .map((output) => view(output));
  return {
    DOM: view$,
    Router: route$
  }
}

run(main, {
  DOM: makeDOMDriver('#app', {
    'search': Search
  }),
  Router: makeRouterDriver({
    html5history: false,
    notFound: () => { return 'Page not found' }
  })
});
