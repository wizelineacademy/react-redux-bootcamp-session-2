import compose from './compose';

// currying
// composition
// compose function

const curry = () => {
  const sum = (a, b) => a + b;
  console.log('normal sum', sum(1, 2));
  const curriedSum = (a) => (b) => a + b;
  console.log('curried sum', curriedSum(1)(2));
};
// curry();

const composition = () => {
  const plusOne = (x) => x + 1;
  const double = (x) => x * 2;
  const a = plusOne(1);
  const b = double(a);
  console.log('in sequence', b);
  console.log('with composition', double(plusOne(1)));

  const composed = compose(double, plusOne);
  console.log('with composited function', composed(1));
};
// composition();
