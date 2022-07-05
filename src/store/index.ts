import { createStore, compose, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import noteReducer from './reducers/note';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(noteReducer, enhancer(applyMiddleware(thunk)));

export type AppState = ReturnType<typeof noteReducer>;
export type CustomDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

export default store;
