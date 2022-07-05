import { FunctionComponent, useState } from 'react';
import styles from './Counter.scss';

type CounterProps = {
  name: string;
  count: number;
  onChange?: (count: number) => void;
};

const Counter: FunctionComponent<CounterProps> = ({ name, count, onChange }) => {
  const [countValue, setCount] = useState(count);

  const increment = () => {
    const newValue = countValue + 1;
    setCount(newValue);
    onChange?.(newValue);
  };

  const decrement = () => {
    const newValue = countValue - 1;
    setCount(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={styles.container}>
      <div>{name}</div>
      <div>
        <input type="button" onClick={increment} value="+" />
        {` ${countValue} `}
        <input type="button" onClick={decrement} value="-" />
      </div>
    </div>
  );
};

export default Counter;
