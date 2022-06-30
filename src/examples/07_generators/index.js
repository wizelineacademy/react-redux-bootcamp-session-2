// generators
// simplest
// with arguments

function* generator1() {
  yield 1;
  yield 2;
  return 3;
}

const simpleGenerator = () => {
  const myGenerator1 = generator1();
  console.log('simple generator', myGenerator1.next());
  console.log('simple generator', myGenerator1.next());
  console.log('simple generator', myGenerator1.next());
};
simpleGenerator();

const loopGenerator = () => {
  const myGenerator = generator1();
  // eslint-disable-next-line no-restricted-syntax
  for (const value of myGenerator) {
    console.log('loop generator', value); // what happened with the return?
  }
};

loopGenerator();

function* generator2(a) {
  const b = 2 + (yield a + 2);
  yield a + b;
}

const generatorArguments = () => {
  const myGenerator3 = generator2(4);
  const iteration = myGenerator3.next();
  console.log('generator arguments', iteration);
  console.log('generator arguments', myGenerator3.next(0));
  // how to fix ?
};

generatorArguments();
