import { FunctionComponent, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import styles from './Note.scss';
import Deletable from '../Deletable';
import { BaseNote } from '../NotesContainer/types';
import { deleteNote } from '../../store/actions/note';

type NoteClassKey = 'note';
export type NoteProps = PropsWithChildren<
  BaseNote & {
    classes?: Record<NoteClassKey, string>;
  }
>;

const Note: FunctionComponent<NoteProps> = ({ children, classes, title, id }) => {
  const dispatch = useDispatch();
  return (
    <Deletable
      classes={{ root: clsx(styles.note, classes?.note) }}
      onDelete={() => dispatch(deleteNote(id))}
    >
      {Boolean(title) && <div className={styles.title}>{title}</div>}
      {children}
    </Deletable>
  );
};

export default Note;
