// import { createStore } from 'redux'; // will it work?
import createStore from './createStore';
import { arrayReducerPure, arrayReducerImpure } from '../02_pureImpureReducer/reducer';
import { addItem } from '../02_pureImpureReducer/actions';
import observableStore from './observableStore';

// createStore
// listen when action got dispatched
// detecting state changes

const simpleSubscriber = () => {
  const store = createStore(arrayReducerPure);
  store.subscribe(() => {
    console.log('simple subscriber', store.getState());
  });
  store.dispatch(addItem(1));
  store.dispatch(addItem(2));
};

// simpleSubscriber();

const watchForChanges = () => {
  const store = createStore(arrayReducerPure); // createStore(arrayReducerImpure);
  observableStore(store);
  store.dispatch(addItem(1));
  store.dispatch(addItem(2));
};

// watchForChanges();
