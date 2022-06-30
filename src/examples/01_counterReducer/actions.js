export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';
export const COUNTER_INCREMENT_BY = 'COUNTER_INCREMENT_BY';

export const increment = () => ({ type: COUNTER_INCREMENT });
export const decrement = () => ({ type: COUNTER_DECREMENT });
export const incrementBy = (step) => ({ type: COUNTER_INCREMENT_BY, step });
