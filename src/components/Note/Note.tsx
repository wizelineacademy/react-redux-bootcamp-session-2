import { FunctionComponent, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Note.scss';
import Deletable from '../Deletable';
import { BaseNote } from '../NotesContainer/types';

type NoteClassKey = 'note';
export type NoteProps = PropsWithChildren<
  BaseNote & {
    onDelete?: (id: string) => void;
    classes?: Record<NoteClassKey, string>;
  }
>;

const Note: FunctionComponent<NoteProps> = ({ children, classes, title, id, onDelete }) => {
  return (
    <Deletable classes={{ root: clsx(styles.note, classes?.note) }} onDelete={() => onDelete?.(id)}>
      {Boolean(title) && <div className={styles.title}>{title}</div>}
      {children}
    </Deletable>
  );
};

export default Note;
