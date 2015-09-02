import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver} from 'cycle-router5';

import {routes, defaultRoute} from './routes';
import main from './main';

if(module.hot) {
  module.hot.accept();
}

run(main, {
  DOM: makeDOMDriver('#app'),
  Router: makeRouterDriver(routes, {
    defaultRoute: defaultRoute,
    useHash: true
  })
});
