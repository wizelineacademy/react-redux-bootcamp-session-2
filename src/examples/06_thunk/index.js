import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from '../05_customRedux_middleware/loggerMiddleware';
import counterReducer from '../01_counterReducer/reducer';
import observableStore from '../03_customRedux/observableStore';
import { increment } from '../01_counterReducer/actions';
import { asyncIncrement, asyncIncrementTimes } from './actions';

// basic of thunk, dispatching a function

const thunkCustom = (api) => (next) => (action) => {
  // why do we need to override the dispatch in api?
  if (typeof action === 'function') {
    return action(api.dispatch);
  }
  return next(action);
};

const store = createStore(counterReducer, applyMiddleware(thunk, loggerMiddleware));
observableStore(store);

store.dispatch(increment());
store.dispatch(asyncIncrement());
store.dispatch(asyncIncrementTimes(2));
