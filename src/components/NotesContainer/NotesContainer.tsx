import { ChangeEvent, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, replaceNotes, updateNote } from '../../store/actions/note';
import { AppState } from '../../store';
import Menu from './Menu';
import NoteList from './NoteList';
import { AvailableNotesTypes, BaseNoteStorage } from './types';

const NotesContainer: FunctionComponent = () => {
  const notes = useSelector((state: AppState) => state);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleUpdate = (id: string, data: BaseNoteStorage<AvailableNotesTypes>) => {
    dispatch(updateNote(id, data));
  };

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
    dispatch(replaceNotes([]));
    const [notesFile] = event.target.files;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const textResult = reader.result as string;
      try {
        const newNotes = JSON.parse(textResult);
        dispatch(replaceNotes(newNotes));
        // eslint-disable-next-line no-empty
      } catch {}
    });
    reader.readAsText(notesFile, 'utf-8');
  };

  return (
    <div>
      <Menu addNew={addNew} importNotes={importNotes} exportNotes={exportNotes} />
      <NoteList handleDelete={handleDelete} handleUpdate={handleUpdate} notes={notes} />
    </div>
  );
};

export default NotesContainer;
