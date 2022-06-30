import { ofType } from 'redux-observable';
import { of, delay } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { incrementBy } from '../01_counterReducer/actions';

const ASYNC_INCREMENT = 'ASYNC_INCREMENT';

export const asyncIncrementBy = (step) => ({ type: ASYNC_INCREMENT, step });

export const asyncIncrementByEpic = (action$) =>
  action$.pipe(
    ofType(ASYNC_INCREMENT),
    // map((action) => {
    //   return incrementBy(action.step);
    // }),
    // delay(1000)
    mergeMap((action) => {
      return of(incrementBy(action.step)).pipe(delay(1000));
    })
  );
