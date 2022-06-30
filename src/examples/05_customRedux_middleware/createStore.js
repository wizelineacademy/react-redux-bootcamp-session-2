const createStore = (rootReducer, enhancer) => {
  let currentState;
  const listeners = [];

  if (typeof enhancer === 'function') {
    // enhancer receives the createStore and is called with the root reducer
    return enhancer(createStore)(rootReducer);
  }

  const getState = () => {
    // get the current state
    return currentState;
  };

  const dispatch = (action) => {
    // get next state
    // talk to the listeners
    currentState = rootReducer(currentState, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    // add a new listener
    listeners.push(listener);
  };

  // init the state with default values
  dispatch({});

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;
