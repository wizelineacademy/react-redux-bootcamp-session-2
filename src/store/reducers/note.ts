import { AvailableNotesTypes, BaseNoteStorage } from '../../components/NotesContainer/types';
import {
  NoteActionTypes,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  REPLACE_NOTES,
} from '../actions/note';

const initialState: Array<BaseNoteStorage<AvailableNotesTypes>> = [];

const noteReducer = (state = initialState, action: NoteActionTypes) => {
  switch (action.type) {
    case REPLACE_NOTES:
      return action.payload;
    case ADD_NOTE:
      return [...state, action.payload];
    case UPDATE_NOTE:
      return state.map((note) => {
        if (note.id !== action.payload.id) {
          return note;
        }
        return { ...note, ...action.payload };
      });
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload.id);
    default:
      return state;
  }
};

export default noteReducer;
