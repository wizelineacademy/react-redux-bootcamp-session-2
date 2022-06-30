import delay from './delay';
import { increment } from '../01_counterReducer/actions';

export const asyncIncrement = () => async (dispatch) => {
  await delay(1000);
  dispatch(increment());
};

export const asyncIncrementTimes = (count) => async (dispatch) => {
  // await delay(1000);
  // dispatch(increment());
  await dispatch(asyncIncrement());
  if (count > 1) {
    dispatch(asyncIncrementTimes(count - 1));
  }
};
