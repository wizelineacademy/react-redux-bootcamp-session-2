import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  call,
  delay,
  put,
  take,
  takeEvery,
  fork,
  cancel,
  cancelled,
  spawn,
  all,
} from 'redux-saga/effects';
import counterReducer from '../01_counterReducer/reducer';
import { increment, decrement } from '../01_counterReducer/actions';
import loggerMiddleware from '../05_customRedux_middleware/loggerMiddleware';
import {
  PERFORM_INCREMENT,
  PERFORM_DECREMENT,
  performIncrement,
  performDecrement,
} from './actions';
import observableStore from '../03_customRedux/observableStore';
import customDelay from '../06_thunk/delay';

export const sagaMiddleware = createSagaMiddleware();
const store = createStore(counterReducer, applyMiddleware(sagaMiddleware, loggerMiddleware));
const { dispatch } = store;
observableStore(store);

// sagas
// 1. empty saga
// 2. take and put
// 3. take loop
// 4. take every
// 5. listen for multiple actions
// 6. async logic
// 7. fork
// 8. spawn
// 9. all

const emptySaga = () => {
  function* rootSaga() {
    console.log('hi');
  }
  sagaMiddleware.run(rootSaga); // same as rootSaga().next();
};
// emptySaga();

const takeAndPut = () => {
  function* rootSaga() {
    yield take(PERFORM_INCREMENT);
    yield put(increment());
  }
  sagaMiddleware.run(rootSaga);
  dispatch(performIncrement());
  dispatch(performIncrement()); // what happened?
};
// takeAndPut();

const takeLoop = () => {
  function* rootSaga() {
    while (true) {
      yield take(PERFORM_INCREMENT);
      yield put(increment());
    }
  }
  sagaMiddleware.run(rootSaga);
  dispatch(performIncrement());
  dispatch(performIncrement());
};
// takeLoop();

const takeEveryEffect = () => {
  function* performIncrementGenerator() {
    yield put(increment());
  }

  function* rootSaga() {
    yield takeEvery(PERFORM_INCREMENT, performIncrementGenerator);
  }

  sagaMiddleware.run(rootSaga);
  dispatch(performIncrement());
  dispatch(performIncrement());
};
// takeEveryEffect();

const listenForMultiple = () => {
  function* performIncrementGenerator() {
    yield put(increment());
  }

  function* performDecrementGenerator() {
    yield put(decrement());
  }

  function* rootSaga() {
    // take every can listen for multiple
    yield takeEvery([PERFORM_INCREMENT, PERFORM_DECREMENT], function* counterAction(action) {
      // we need to know what to do when the action arrives
      if (action.type === PERFORM_INCREMENT) {
        yield call(performIncrementGenerator);
        return;
      }
      yield call(performDecrementGenerator);
    });
    // or we can call take every the times we need
    // yield takeEvery('PERFORM_INCREMENT', performIncrementGenerator); // takeEvery is non blocking
    // yield takeEvery('PERFORM_DECREMENT', performDecrementGenerator);
  }

  sagaMiddleware.run(rootSaga);
  dispatch(performIncrement());
  dispatch(performDecrement());
};
// listenForMultiple();

const asyncCounter = () => {
  function* performAsyncIncrement() {
    yield delay(1000);
    yield put(increment());
  }

  function* performAsyncDecrement() {
    yield call(customDelay, 1000); // works as yield customDelay(1000), but different output
    yield put(decrement());
  }

  function* rootSaga() {
    yield takeEvery(PERFORM_INCREMENT, performAsyncIncrement);
    yield takeEvery(PERFORM_DECREMENT, performAsyncDecrement);
  }

  sagaMiddleware.run(rootSaga);
  dispatch(performIncrement());
  dispatch(performDecrement());
};
// asyncCounter();

const forkEffect = () => {
  function* performIncrementGenerator() {
    try {
      yield take(PERFORM_INCREMENT);
      // throw Error('failed somewhere');
      yield delay(1000);
      yield put(increment());
    } finally {
      if (yield cancelled()) {
        console.log('got cancelled, try to recover');
      }
    }
  }

  function* performDecrementGenerator() {
    yield take(PERFORM_DECREMENT);
    yield put(decrement());
  }

  function* rootSaga() {
    // call blocks, so we can use fork
    // fork returns a task that can be cancelled
    // if forked task fails, it will terminate the whole saga

    // yield call(performIncrementGenerator); // blocks
    const task = yield fork(performIncrementGenerator);
    yield call(performDecrementGenerator);
    yield cancel(task);
  }

  sagaMiddleware.run(rootSaga);
  // dispatch(performDecrement());
  dispatch(performIncrement());
  dispatch(performDecrement());
};
// forkEffect();

const spawnEffect = () => {
  function* performIncrementGenerator() {
    try {
      yield take(PERFORM_INCREMENT);
      throw Error('failed somewhere');
    } finally {
      if (yield cancelled()) {
        console.log('got cancelled, try to recover');
      }
    }
  }

  function* performDecrementGenerator() {
    yield take(PERFORM_DECREMENT);
    yield put(decrement());
  }

  function* rootSaga() {
    // call blocks, so we can use fork
    // fork returns a task that can be cancelled
    // if spawn task fails, the saga continues to work
    yield spawn(performIncrementGenerator);
    yield call(performDecrementGenerator);
  }

  sagaMiddleware.run(rootSaga);
  // dispatch(performDecrement());
  dispatch(performIncrement());
  dispatch(performDecrement());
};
// spawnEffect();

const allEffect = () => {
  function* performAsyncIncrement() {
    // while (true) {
    // yield take(PERFORM_INCREMENT);
    yield delay(1000);
    yield put(increment());
    // }
  }

  function* performAsyncDecrement() {
    yield delay(1000);
    yield put(decrement());
  }

  function* watchForIncrement() {
    yield takeEvery(PERFORM_INCREMENT, performAsyncIncrement);
  }

  function* watchForDecrement() {
    yield takeEvery(PERFORM_DECREMENT, performAsyncDecrement);
  }

  function* rootSaga() {
    // yield all([watchForIncrement(), watchForDecrement()]);
    yield all([call(watchForIncrement), call(watchForDecrement)]);
  }

  sagaMiddleware.run(rootSaga);
  dispatch(performIncrement());
  dispatch(performDecrement());
};
// allEffect();
