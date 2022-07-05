import { createStore, compose, AnyAction, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootSaga from './actions/saga';
import rootEpic from './actions/epic';
import noteReducer from './reducers/note';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const saga = createSagaMiddleware();
const epic = createEpicMiddleware();
const store = createStore(noteReducer, enhancer(applyMiddleware(thunk, saga, epic)));
saga.run(rootSaga);
epic.run(rootEpic);

export type AppState = ReturnType<typeof noteReducer>;
export type CustomDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

export default store;
