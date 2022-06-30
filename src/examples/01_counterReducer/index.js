import { decrement, increment, COUNTER_INCREMENT } from './actions';
import counterReducer from './reducer';

// Basics of reducer
// initial state
// update on action received

let state;
state = counterReducer(state, {});
console.log(state);

state = counterReducer(state, { type: COUNTER_INCREMENT });
console.log(state);

state = counterReducer(state, increment());
console.log(state);

state = counterReducer(state, increment());
state = counterReducer(state, increment());
state = counterReducer(state, decrement());
console.log(state); // ?
