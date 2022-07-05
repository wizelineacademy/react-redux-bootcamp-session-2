import { ChangeEvent, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../store/actions/note';
import Note, { NoteProps } from '../Note';
import styles from './NoteText.scss';

export type NoteTextProps = NoteProps & {
  text: string;
};

const NoteText: FunctionComponent<NoteTextProps> = ({ text, ...baseNoteProps }) => {
  const dispatch = useDispatch();
  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = event.target.value;
    dispatch(updateNote(baseNoteProps.id, { text: newTextValue }));
  };

  return (
    <Note {...baseNoteProps}>
      <textarea className={styles.textarea} onChange={onTextChange} defaultValue={text} />
    </Note>
  );
};

export default NoteText;
