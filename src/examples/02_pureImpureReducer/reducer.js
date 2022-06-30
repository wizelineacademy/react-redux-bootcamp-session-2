import { ADD_ITEM } from './actions';

const arrayReducerPure = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]; // state.concat(action.item)
    default:
      return state;
  }
};

const arrayReducerImpure = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      state.push(action.item);
      return state;
    default:
      return state;
  }
};

export { arrayReducerPure, arrayReducerImpure };
