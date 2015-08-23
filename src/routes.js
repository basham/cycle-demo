/** @jsx hJSX */
import {hJSX} from '@cycle/dom';

export const routes = [
  {
    name: 'home',
    path: '/',
    component: () => { return <search/> }
  },
  {
    name: 'hello',
    path: '/hello',
    component: () => { return <h2>wahoo</h2> }
  }
];
