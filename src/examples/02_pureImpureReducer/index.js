import { addItem } from './actions';
import { arrayReducerImpure, arrayReducerPure } from './reducer';

// Pure vs impure reducer
//   outputs
//   detecting changes

const pureVsImpure = () => {
  let statePure;
  statePure = arrayReducerPure(statePure, {});
  statePure = arrayReducerPure(statePure, addItem(1));
  statePure = arrayReducerPure(statePure, addItem(2));
  statePure = arrayReducerPure(statePure, addItem(3));
  console.log('pure reducer', statePure); // => [1, 2, 3]

  let stateImpure;
  stateImpure = arrayReducerImpure(stateImpure, {});
  stateImpure = arrayReducerImpure(stateImpure, addItem(1));
  stateImpure = arrayReducerImpure(stateImpure, addItem(2));
  stateImpure = arrayReducerImpure(stateImpure, addItem(3));
  console.log('impure reducer', stateImpure); // => [1, 2, 3]
  // Both returned the same, so what is the deal?
};

// pureVsImpure();

const pureVsImpureDifference = () => {
  let stateImpure;
  let prevStateImpure;
  stateImpure = arrayReducerImpure(prevStateImpure, {});
  prevStateImpure = stateImpure;
  stateImpure = arrayReducerImpure(prevStateImpure, addItem(1));
  console.log('impure reducer, state changed?', stateImpure !== prevStateImpure);

  let statePure;
  let prevStatePure;
  statePure = arrayReducerPure(prevStatePure, {});
  prevStatePure = statePure;
  statePure = arrayReducerPure(prevStatePure, addItem(1));
  console.log('pure reducer, state changed?', statePure !== prevStatePure);
};

// pureVsImpureDifference();
