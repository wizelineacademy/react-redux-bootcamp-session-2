import { AvailableNotesTypes, BaseNoteStorage } from '../../components/NotesContainer/types';

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const REPLACE_NOTES = 'REPLACE_NOTES';

type AddNoteAction = {
  type: typeof ADD_NOTE;
  payload: BaseNoteStorage<AvailableNotesTypes>;
};

type UpdateNoteAction = {
  type: typeof UPDATE_NOTE;
  payload: BaseNoteStorage<AvailableNotesTypes>;
};

type DeleteNoteAction = {
  type: typeof DELETE_NOTE;
  payload: {
    id: string;
  };
};

type ReplaceNotesAction = {
  type: typeof REPLACE_NOTES;
  payload: Array<BaseNoteStorage<AvailableNotesTypes>>;
};

export const replaceNotes = (notes: Array<BaseNoteStorage<AvailableNotesTypes>>) => {
  return {
    type: REPLACE_NOTES,
    payload: notes,
  };
};

export const addNote = <T extends AvailableNotesTypes>(type: T, data: BaseNoteStorage<T>) => {
  return {
    type: ADD_NOTE,
    payload: {
      ...data,
      type,
    },
  };
};

export const updateNote = <T extends AvailableNotesTypes>(
  id: string,
  data: Partial<BaseNoteStorage<T>>
) => {
  return {
    type: UPDATE_NOTE,
    payload: {
      ...data,
      id,
    },
  };
};

export const deleteNote = (id: string) => {
  return {
    type: DELETE_NOTE,
    payload: { id },
  };
};

export type NoteActionTypes =
  | AddNoteAction
  | UpdateNoteAction
  | DeleteNoteAction
  | ReplaceNotesAction;
