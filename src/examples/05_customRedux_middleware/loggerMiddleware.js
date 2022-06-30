const loggerMiddleware = () => (next) => (action) => {
  // just log the date along with the action
  // then pass the action to the next middleware
  console.log(new Date().toLocaleString(), action);
  next(action);
};

export default loggerMiddleware;
