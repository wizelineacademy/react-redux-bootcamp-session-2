import { FunctionComponent } from 'react';
import NoteCounter from '../../NoteCounter';
import NoteText from '../../NoteText';
import NoteToDo from '../../NoteToDo';
import NoteCanvas from '../../NoteCanvas';
import { AvailableNotesTypes, BaseNoteStorage } from '../types';
import styles from './NoteList.scss';

type NoteListProps = {
  notes: BaseNoteStorage<AvailableNotesTypes>[];
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, data: BaseNoteStorage<AvailableNotesTypes>) => void;
};

const availableNotes = {
  canvas: NoteCanvas,
  counter: NoteCounter,
  text: NoteText,
  todo: NoteToDo,
};

const isNoteOfValidType = <T extends AvailableNotesTypes>(
  note: BaseNoteStorage<T>
): note is BaseNoteStorage<T> => {
  return availableNotes[note.type] !== undefined;
};

const NoteList: FunctionComponent<NoteListProps> = ({ notes, handleDelete, handleUpdate }) => {
  return (
    <div className={styles.list}>
      {notes.map((note) => {
        if (!isNoteOfValidType(note)) {
          return null;
        }
        const NoteComponent = availableNotes[note.type];
        return (
          <NoteComponent
            key={note.id}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(note as any)}
            onDelete={() => handleDelete(note.id)}
            onChange={(data: never) => handleUpdate(note.id, data)}
          />
        );
      })}
    </div>
  );
};

export default NoteList;
