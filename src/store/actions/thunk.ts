import debounce from 'lodash.debounce';
import { Dispatch } from 'redux';
import { replaceNotes, updateNote } from './note';

export const importFromFile = (file: File) => (dispatch: Dispatch) => {
  dispatch(replaceNotes([]));
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const textResult = reader.result as string;
    try {
      const newNotes = JSON.parse(textResult);
      dispatch(replaceNotes(newNotes));
      // eslint-disable-next-line no-empty
    } catch {}
  });
  reader.readAsText(file, 'utf-8');
};

const saveCanvas = debounce((id: string, canvas: HTMLCanvasElement, dispatch: Dispatch) => {
  const newContent = canvas.toDataURL('image/png');
  dispatch(updateNote(id, { content: newContent }));
}, 2500);

export const saveCanvasContent =
  (id: string, canvas: HTMLCanvasElement) => (dispatch: Dispatch) => {
    saveCanvas(id, canvas, dispatch);
  };
