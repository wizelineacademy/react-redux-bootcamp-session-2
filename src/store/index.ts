import { createStore, compose } from 'redux';
import noteReducer from './reducers/note';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(noteReducer, enhancer());

export type AppState = ReturnType<typeof noteReducer>;

export default store;
