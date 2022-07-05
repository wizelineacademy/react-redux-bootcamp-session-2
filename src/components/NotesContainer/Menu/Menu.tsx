import { ChangeEvent, FunctionComponent } from 'react';
import { AvailableNotesTypes } from '../types';
import styles from './Menu.scss';

type MenuProps = {
  addNew: (type: AvailableNotesTypes) => void;
  exportNotes: () => void;
  importNotes: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Menu: FunctionComponent<MenuProps> = ({ addNew, exportNotes, importNotes }) => {
  return (
    <div className={styles.menu}>
      <div className={styles['new-bar']}>
        <button type="button" onClick={() => addNew('text')}>
          New Text Note
        </button>
        <button type="button" onClick={() => addNew('canvas')}>
          New Drawing Note
        </button>
        <button type="button" onClick={() => addNew('todo')}>
          New To Do Note
        </button>
        <button type="button" onClick={() => addNew('counter')}>
          New Counter Note
        </button>
      </div>
      <div>
        <button type="button" onClick={exportNotes}>
          Export
        </button>
        <div>
          Import: <input type="file" onChange={importNotes} accept=".json" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
