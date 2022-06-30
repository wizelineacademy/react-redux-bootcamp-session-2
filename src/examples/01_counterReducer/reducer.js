import { COUNTER_DECREMENT, COUNTER_INCREMENT, COUNTER_INCREMENT_BY } from './actions';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return state + 1;
    case COUNTER_DECREMENT:
      return state - 1;
    case COUNTER_INCREMENT_BY:
      return state + action.step;
    default:
      return state;
  }
};

export default counterReducer;
