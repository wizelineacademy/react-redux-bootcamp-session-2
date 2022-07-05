import { ChangeEvent, FunctionComponent } from 'react';
import Note, { NoteProps } from '../Note';
import styles from './NoteText.scss';

export type NoteTextProps = NoteProps & {
  text: string;
  onChange?: (data: Record<string, unknown>) => void;
};

const NoteText: FunctionComponent<NoteTextProps> = ({ text, onChange, ...baseNoteProps }) => {
  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = event.target.value;
    onChange?.({ text: newTextValue });
  };

  return (
    <Note {...baseNoteProps}>
      <textarea className={styles.textarea} onChange={onTextChange} defaultValue={text} />
    </Note>
  );
};

export default NoteText;
