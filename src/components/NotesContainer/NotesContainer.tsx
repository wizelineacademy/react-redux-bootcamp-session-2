import { ChangeEvent, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../store/actions/note';
import { AppState, CustomDispatch } from '../../store';
import Menu from './Menu';
import NoteList from './NoteList';
import { AvailableNotesTypes } from './types';
import { importFromFile } from '../../store/actions/saga';

const NotesContainer: FunctionComponent = () => {
  const notes = useSelector((state: AppState) => state);
  const dispatch = useDispatch<CustomDispatch>();

  const addNew = (type: AvailableNotesTypes) => {
    const newNote = {
      type,
      id: crypto.randomUUID(),
    };
    dispatch(addNote(type, newNote));
  };

  const exportNotes = () => {
    const jsonNotes = JSON.stringify(notes);
    const anchor = document.createElement('a');
    anchor.setAttribute('download', 'notes.json');
    anchor.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(jsonNotes)}`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const importNotes = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const [notesFile] = event.target.files;
    dispatch(importFromFile(notesFile));
  };

  return (
    <div>
      <Menu addNew={addNew} importNotes={importNotes} exportNotes={exportNotes} />
      <NoteList notes={notes} />
    </div>
  );
};

export default NotesContainer;
