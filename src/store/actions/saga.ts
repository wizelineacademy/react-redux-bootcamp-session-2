import { call, takeEvery, put, PutEffect, CallEffect, debounce } from 'redux-saga/effects';
import { BaseNoteStorage, NoteTypesMap } from '../../components/NotesContainer/types';
import { replaceNotes, updateNote } from './note';

const IMPORT_FILE_SAGA = 'IMPORT_FILE_SAGA';
const SAVE_CANVAS_CONTENT_SAGA = 'SAVE_CANVAS_CONTENT_SAGA';

type ImportFromFileAction = {
  type: typeof IMPORT_FILE_SAGA;
  payload: File;
};

type SaveCanvasContentAction = {
  type: typeof SAVE_CANVAS_CONTENT_SAGA;
  payload: {
    id: string;
    canvas: HTMLCanvasElement;
  };
};

type Notes = Array<BaseNoteStorage<keyof NoteTypesMap>>;

export const importFromFile = (file: File): ImportFromFileAction => ({
  type: IMPORT_FILE_SAGA,
  payload: file,
});

export const saveCanvasContent = (
  id: string,
  canvas: HTMLCanvasElement
): SaveCanvasContentAction => ({
  type: SAVE_CANVAS_CONTENT_SAGA,
  payload: { id, canvas },
});

const promisifiedFileReader = (file: File) =>
  new Promise<Notes>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const textResult = reader.result as string;
      try {
        const newNotes = JSON.parse(textResult);
        resolve(newNotes);
      } catch {
        resolve([]);
      }
    });
    reader.readAsText(file, 'utf-8');
  });

function* handleImportFromFile(action: ImportFromFileAction): Generator<PutEffect | CallEffect> {
  yield put(replaceNotes([]));
  const notes = (yield call(promisifiedFileReader, action.payload)) as Notes;
  yield put(replaceNotes(notes));
}

function* handleSaveCanvasContent(action: SaveCanvasContentAction): Generator {
  const { id, canvas } = action.payload;
  const newContent = canvas.toDataURL('image/png');
  yield put(updateNote(id, { content: newContent }));
}

function* rootSaga() {
  yield takeEvery(IMPORT_FILE_SAGA, handleImportFromFile);
  yield debounce(2500, SAVE_CANVAS_CONTENT_SAGA, handleSaveCanvasContent);
}

export default rootSaga;
