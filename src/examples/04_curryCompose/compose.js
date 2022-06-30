// compose(a, b, c) > a(b(c(...)))
const compose = (...fns) => {
  return fns.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
};

export default compose;
