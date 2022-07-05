import { FunctionComponent, useState } from 'react';
import styles from './NewCounter.scss';

export type NewCounterData = {
  name: string;
  count: number;
};

type NewCounterProps = {
  onCounterAdd: (counter: NewCounterData) => void;
};

const NewCounter: FunctionComponent<NewCounterProps> = ({ onCounterAdd }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);

  return (
    <div className={styles['new-counter']}>
      <label htmlFor="counter-note-new-name">
        <span>Name: </span>
        <input
          id="counter-note-new-name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event?.target.value);
          }}
        />
      </label>
      <label htmlFor="counter-note-new-name">
        <span>Initial Count:</span>
        <input
          id="counter-note-new-initial-count"
          type="number"
          value={count}
          onChange={(event) => {
            const value = parseInt(event?.target.value, 10);
            setCount(value);
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          setCount(0);
          setName('');
          onCounterAdd({ name, count });
        }}
      >
        Add Counter
      </button>
    </div>
  );
};

export default NewCounter;
