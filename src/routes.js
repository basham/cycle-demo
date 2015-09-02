/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

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
  'home': () => <search/>,
  'hello': () => <h2>wahoos!</h2>
}
