import { FunctionComponent, useState } from 'react';
import styles from './NewItem.scss';

type NewItemProps = {
  onItemAdd: (item: string) => void;
};

const NewItem: FunctionComponent<NewItemProps> = ({ onItemAdd }) => {
  const [itemValue, setItemValue] = useState('');
  return (
    <div className={styles['new-item']}>
      <input type="text" value={itemValue} onChange={(event) => setItemValue(event.target.value)} />
      <button
        type="button"
        onClick={() => {
          setItemValue('');
          onItemAdd(itemValue);
        }}
      >
        Add Item
      </button>
    </div>
  );
};

export default NewItem;
