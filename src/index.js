import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import main from './main';

if(module.hot) {
  module.hot.accept();
}

run(main, {
  DOM: makeDOMDriver('#app')
});
