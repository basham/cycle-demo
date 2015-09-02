/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

import Search from './components/Search';

export const routes = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'hello',
    path: '/hello'
  }
];

export const handlers = {
  'home': (sources) => Search(sources).DOM,
  'hello': () => <h2>wahoos!</h2>
}

export const defaultRoute = 'hello';
