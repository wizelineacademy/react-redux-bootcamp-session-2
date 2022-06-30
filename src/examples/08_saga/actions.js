import { put, takeEvery, all } from 'redux-saga/effects';
import delay from '../06_thunk/delay';
import { incrementBy } from '../01_counterReducer/actions';

export const ASYNC_COUNTER_INCREMENT = 'ASYNC_COUNTER_INCREMENT';
export const PERFORM_INCREMENT = 'PERFORM_INCREMENT';
export const PERFORM_DECREMENT = 'PERFORM_DECREMENT';

export const performIncrement = () => ({
  type: PERFORM_INCREMENT,
});

export const performDecrement = () => ({
  type: PERFORM_DECREMENT,
});

export const asyncCounterIncrementBy = (step = 1) => {
  return {
    type: ASYNC_COUNTER_INCREMENT,
    payload: { step },
  };
};

function* asyncCounterIncrementImpl(action) {
  const { step } = action.payload;
  yield delay(1000);
  // yield call(delay, 1000);
  yield put(incrementBy(step));
}

function* watchAsyncCounterIncrement() {
  yield takeEvery(ASYNC_COUNTER_INCREMENT, asyncCounterIncrementImpl);
}

export default function* rootSaga() {
  yield all([watchAsyncCounterIncrement()]);
}
