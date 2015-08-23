/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

export const routes = [
  {
    name: 'home',
    path: '/',
    handler: () => <search/>
  },
  {
    name: 'hello',
    path: '/hello',
    handler: () => <h2>wahoo</h2>
  }
];
