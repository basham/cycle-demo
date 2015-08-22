/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';
import classNames from 'classnames';

import formStyles from './Form.less';
import headerStyles from './Header.less';

function intent(DOM) {
  return {
    changeName$: DOM.get('.js-name-input', 'input')
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
  return state$.map(({name}) =>
    <div>
      <div className={formStyles.block}>
        <label className={formStyles.label}>
          Name
        </label>
        <input
          className={classNames(formStyles.textInput, 'js-name-input')}
          type="text"/>
      </div>
      <h1 className={headerStyles.h1}>Hello {name}</h1>
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
