/** @jsx hJSX */
import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';
import classNames from 'classnames';

import styles from './Search.less';
import headerStyles from './Header.less';

function intent(DOM) {
  return {
    changeName$: DOM.select('.js-name-input').events('input')
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
      <div className={styles.block}>
        <label className={styles.label}>
          Name
        </label>
        <input
          className={classNames(styles.textInput, 'js-name-input')}
          type="text"/>
      </div>
      <h1 className={headerStyles.h1}>Hello {name}</h1>
    </div>
  );
}

export default function Search({DOM}) {
  let actions = intent(DOM);
  let state$ = model(actions);
  let view$ = view(state$);
  return {
    DOM: view$
  };
}
