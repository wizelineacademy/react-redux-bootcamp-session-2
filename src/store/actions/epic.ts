import { combineEpics, ofType } from 'redux-observable';
import { concat, of, from, debounceTime } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { BaseNoteStorage, NoteTypesMap } from '../../components/NotesContainer/types';
import { replaceNotes, updateNote } from './note';

const IMPORT_FILE_EPIC = 'IMPORT_FILE_EPIC';
const SAVE_CANVAS_CONTENT_EPIC = 'SAVE_CANVAS_CONTENT_EPIC';

type ImportFromFileAction = {
  type: typeof IMPORT_FILE_EPIC;
  payload: File;
};

type SaveCanvasContentAction = {
  type: typeof SAVE_CANVAS_CONTENT_EPIC;
  payload: {
    id: string;
    canvas: HTMLCanvasElement;
  };
};

type Notes = Array<BaseNoteStorage<keyof NoteTypesMap>>;

export const importFromFile = (file: File): ImportFromFileAction => ({
  type: IMPORT_FILE_EPIC,
  payload: file,
});

export const saveCanvasContent = (
  id: string,
  canvas: HTMLCanvasElement
): SaveCanvasContentAction => ({
  type: SAVE_CANVAS_CONTENT_EPIC,
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

function importFromFileEpic(action$: any) {
  return action$.pipe(
    ofType(IMPORT_FILE_EPIC),
    mergeMap((action: ImportFromFileAction) => {
      const { payload: file } = action;
      return concat(
        of(replaceNotes([])),
        from(promisifiedFileReader(file)).pipe(mergeMap((data) => of(replaceNotes(data))))
      );
    })
  );
}

function saveCanvasContentEpic(action$: any) {
  return action$.pipe(
    ofType(SAVE_CANVAS_CONTENT_EPIC),
    debounceTime(2500),
    switchMap((action: SaveCanvasContentAction) => {
      const { id, canvas } = action.payload;
      const newContent = canvas.toDataURL('image/png');
      return of(updateNote(id, { content: newContent } as never));
    })
  );
}

export default combineEpics(importFromFileEpic, saveCanvasContentEpic);
