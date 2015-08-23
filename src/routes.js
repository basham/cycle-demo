/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

export const routes = [
  {
    name: 'home',
    path: '/',
    component: () => <search/>
  },
  {
    name: 'hello',
    path: '/hello',
    component: () => <h2>wahoo</h2>
  }
];
