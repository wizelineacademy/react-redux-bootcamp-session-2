const observableStore = (store) => {
  let currentState = store.getState();
  const listenForChanges = () => {
    const newState = store.getState();
    if (currentState === newState) {
      return;
    }
    currentState = newState;
    console.log('state changed', newState);
  };
  store.subscribe(listenForChanges);
};

export default observableStore;
