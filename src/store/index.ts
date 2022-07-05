import { createStore, compose, applyMiddleware, AnyAction } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootSaga from './actions/saga';
import noteReducer from './reducers/note';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saga = createSagaMiddleware();
const store = createStore(noteReducer, enhancer(applyMiddleware(thunk, saga)));
saga.run(rootSaga);

export type AppState = ReturnType<typeof noteReducer>;
export type CustomDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

export default store;
