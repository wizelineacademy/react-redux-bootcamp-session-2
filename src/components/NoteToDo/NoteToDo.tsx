import clsx from 'clsx';
import { FunctionComponent, useState } from 'react';
import Deletable from '../Deletable';
import Note, { NoteProps } from '../Note';
import Checkbox from './Checkbox';
import NewItem from './NewItem';
import styles from './NoteToDo.scss';

type Item = {
  id: number;
  checked: boolean;
  text: string;
};

export type NoteToDoProps = NoteProps & {
  itemList: Item[];
  onChange?: (data: Record<string, unknown>) => void;
};

const NoteToDo: FunctionComponent<NoteToDoProps> = ({
  itemList = [],
  onChange,
  ...baseNoteProps
}) => {
  const [localItemList, setLocalItemList] = useState(itemList);
  const onItemAdd = (item: string) => {
    const newItem: Item = {
      id: localItemList.length,
      checked: false,
      text: item,
    };
    const newItemList = [...localItemList, newItem];
    setLocalItemList(newItemList);
    onChange?.({ itemList: newItemList });
  };

  const onItemDelete = (itemId: number) => {
    const newItemList = localItemList.filter((item) => item.id !== itemId);
    setLocalItemList(newItemList);
    onChange?.({ itemList: newItemList });
  };

  const onItemToggle = (itemId: number, checked: boolean) => {
    const newItems = localItemList.map((item) =>
      item.id === itemId ? { ...item, checked } : item
    );
    setLocalItemList(newItems);
    onChange?.({ itemList: newItems });
  };

  return (
    <Note {...baseNoteProps}>
      {localItemList.map((item) => (
        <Deletable key={item.id} onDelete={() => onItemDelete(item.id)}>
          <div>
            <Checkbox
              checked={item.checked}
              onChange={(checked) => onItemToggle(item.id, checked)}
            />
            <span className={clsx(item.checked && styles.done)}>{item.text}</span>
          </div>
        </Deletable>
      ))}
      <NewItem onItemAdd={onItemAdd} />
    </Note>
  );
};

export default NoteToDo;
