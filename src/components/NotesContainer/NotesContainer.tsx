import { ChangeEvent, FunctionComponent, useState } from 'react';
import Menu from './Menu';
import NoteList from './NoteList';
import { AvailableNotesTypes, BaseNoteStorage } from './types';

const defaultNotes: Array<BaseNoteStorage<AvailableNotesTypes>> = [
  {
    id: '0',
    type: 'text',
    text: 'my text note',
  },
  {
    id: '1',
    type: 'counter',
    counters: [
      { id: 0, name: 'Person A', count: 0 },
      { id: 1, name: 'Person B', count: 0 },
    ],
  },
  {
    id: '2',
    type: 'todo',
    itemList: [
      { id: 0, text: 'bacon', checked: false },
      { id: 1, text: 'eggs', checked: false },
      { id: 2, text: 'ham', checked: false },
    ],
  },
  {
    id: '3',
    type: 'canvas',
  },
];

const NotesContainer: FunctionComponent = () => {
  const [notes, setNotes] = useState(defaultNotes);

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleUpdate = (id: string, data: BaseNoteStorage<AvailableNotesTypes>) => {
    const newNotes = notes.map((note) => {
      if (note.id !== id) {
        return note;
      }
      return { ...note, ...data };
    });
    setNotes(newNotes);
  };

  const addNew = (type: AvailableNotesTypes) => {
    const newNote = {
      type,
      id: crypto.randomUUID(),
    };
    setNotes([...notes, newNote]);
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
    setNotes([]);
    const [notesFile] = event.target.files;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const textResult = reader.result as string;
      try {
        const newNotes = JSON.parse(textResult);
        setNotes(newNotes);
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
