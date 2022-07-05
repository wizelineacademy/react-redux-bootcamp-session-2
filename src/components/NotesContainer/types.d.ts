export type BaseNote = {
  id: string;
  title?: string;
};

export type BaseNoteOfType<T extends string> = {
  type: T;
} & BaseNote;

export interface CanvasNoteDefinition extends BaseNoteOfType<'canvas'> {
  content?: string;
}

export interface ToDoNoteDefinition extends BaseNoteOfType<'todo'> {
  itemList?: Array<{
    id: number;
    checked: boolean;
    text: string;
  }>;
}

export interface TextNoteDefinition extends BaseNoteOfType<'text'> {
  text?: string;
}

export interface CounterNoteDefinition extends BaseNoteOfType<'counter'> {
  counters?: Array<{
    id: number;
    name: string;
    count: number;
  }>;
}

export type NoteTypesMap = {
  canvas: CanvasNoteDefinition;
  todo: ToDoNoteDefinition;
  counter: CounterNoteDefinition;
  text: TextNoteDefinition;
};

export type AvailableNotesTypes = keyof NoteTypesMap;

export type BaseNoteStorage<T extends AvailableNotesTypes> = NoteTypesMap[T];
