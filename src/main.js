/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

function intent(DOM) {
  return {
    changeName$: DOM.get('.field', 'input')
      .map(ev => ev.target.value)
  };
}

function model(actions) {
  return Rx.Observable.combineLatest(
    actions.changeName$.startWith(''),
    (name) => ({name})
  );
}

function view(state$) {
  state$.forEach(state => console.log('---', state));
  return state$.map(({name}) =>
    <div>
      <label className="label">Name:</label>
      <input type="text" className="field"/>
      <hr/>
      <h1 className="header">Hello {name}</h1>
    </div>
  );
}

export default function main({DOM}) {
  let actions = intent(DOM);
  let state$ = model(actions);
  return {
    DOM: view(state$)
  };
}
