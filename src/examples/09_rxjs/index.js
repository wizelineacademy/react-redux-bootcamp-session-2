import { from, of, delay, concat, interval } from 'rxjs';
import { mergeMap, switchMap, filter, map, take } from 'rxjs/operators';

// rxjs operators
// 1. of
// 2. from
// 3. map
// 4. mergeMap
// 5. switchMap
// 6. filter
// 7. concat
// 8. interval

const operatorOf = () => {
  of(1, 2, 3).subscribe(console.log);
};
// operatorOf();

const operatorFrom = () => {
  from([1, 2, 3]).subscribe(console.log);
  from(Promise.resolve(1)).subscribe(console.log);
};
// operatorFrom();

const operatorMap = () => {
  from([1, 2, 3])
    .pipe(map((value) => value * 2))
    .subscribe(console.log);
};
// operatorMap();

const doubleValue = (value) => of(value);
const doubleValueDelay = (value) => doubleValue(value).pipe(delay(1000));

const operatorMergeMap = () => {
  from([1, 2, 3])
    .pipe(mergeMap(doubleValue))
    .subscribe((value) => console.log('mergeMap', value));
};
// operatorMergeMap();

const operatorSwitchMap = () => {
  from([1, 2, 3])
    .pipe(switchMap(doubleValueDelay))
    .subscribe((value) => console.log('switchMap', value));
};
// operatorSwitchMap();

const operatorFilter = () => {
  from([1, 2, 3])
    .pipe(filter((value) => value > 1))
    .subscribe(console.log);
};
// operatorFilter();

const concatOperator = () => {
  concat(
    from([1, 2, 3]).pipe(mergeMap((value) => of(value).pipe(delay(1000)))),
    from([4, 5, 6]).pipe(mergeMap((value) => of(value).pipe(delay(100))))
  ).subscribe((value) => console.log('concat', value));
};
// concatOperator();

const intervalTakeOperator = () => {
  interval(1000)
    .pipe(take(3))
    .subscribe((value) => console.log('interval', value));
};
// intervalTakeOperator();
