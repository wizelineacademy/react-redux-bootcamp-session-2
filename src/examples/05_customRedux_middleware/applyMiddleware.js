import compose from '../04_curryCompose/compose';

const applyMiddleware = (...middlewares) => {
  return (createStore) => {
    return (rootReducer) => {
      const store = createStore(rootReducer);
      let dispatch = () => {};
      const api = {
        dispatch: () => dispatch(),
        getState: store.getState,
      };
      const initializedMiddlewares = middlewares.map((midleware) => midleware(api));
      dispatch = compose(...initializedMiddlewares)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
};

export default applyMiddleware;
