import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import loggerMiddleware from '../05_customRedux_middleware/loggerMiddleware';
import counterReducer from '../01_counterReducer/reducer';
import observableStore from '../03_customRedux/observableStore';
import { increment } from '../01_counterReducer/actions';
import { asyncIncrementBy, asyncIncrementByEpic } from './actions';

const rootEpic = combineEpics(asyncIncrementByEpic);
const epicMiddleware = createEpicMiddleware();
const store = createStore(counterReducer, applyMiddleware(epicMiddleware, loggerMiddleware));
epicMiddleware.run(rootEpic);

observableStore(store);
store.dispatch(increment());
store.dispatch(asyncIncrementBy(10));
