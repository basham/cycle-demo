import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver} from 'cycle-router5';

import {routes} from './routes';
import main from './main';
import Search from './Search';

if(module.hot) {
  module.hot.accept();
}

run(main, {
  DOM: makeDOMDriver('#app', {
    'search': Search
  }),
  Router: makeRouterDriver(routes, {
    defaultRoute: 'hello',
    useHash: true
  })
});
