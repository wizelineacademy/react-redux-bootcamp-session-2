// import { applyMiddleware } from 'redux'; // will it work?
import applyMiddleware from './applyMiddleware';
import createStore from './createStore';
import counterReducer from '../01_counterReducer/reducer';
import observableStore from '../03_customRedux/observableStore';
import { increment } from '../01_counterReducer/actions';
import loggerMiddleware from './loggerMiddleware';

// enhancing a store, adding middleware

const store = createStore(counterReducer, applyMiddleware(loggerMiddleware));
observableStore(store);
store.dispatch(increment());
store.dispatch(increment());
