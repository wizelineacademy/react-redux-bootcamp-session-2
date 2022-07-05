import { FunctionComponent, MouseEvent, useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import Note, { NoteProps } from '../Note';
import styles from './NoteCanvas.scss';
import { updateNote } from '../../store/actions/note';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 200;

export type NoteCanvasProps = NoteProps & {
  content?: string;
};

const NoteCanvas: FunctionComponent<NoteCanvasProps> = ({ content, ...baseNoteProps }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  const drawingMeta = useRef({ x: 0, y: 0, drawing: false });

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    canvasContextRef.current = canvasContext as CanvasRenderingContext2D;
  }, []);

  useEffect(() => {
    if (!content) {
      return;
    }

    const image = new Image();
    image.src = content;
    image.onload = () => {
      canvasContextRef.current?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      canvasContextRef.current?.drawImage(image, 0, 0);
    };
  }, [content]);

  const drawLine = (
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    const { nativeEvent } = event;
    const meta = drawingMeta.current;
    meta.drawing = true;
    meta.x = nativeEvent.offsetX;
    meta.y = nativeEvent.offsetY;
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const meta = drawingMeta.current;
    if (!meta.drawing) {
      return;
    }
    const canvasContext = canvasContextRef.current as CanvasRenderingContext2D;
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    drawLine(canvasContext, meta.x, meta.y, offsetX, offsetY);
    meta.x = offsetX;
    meta.y = offsetY;
  };

  const saveCanvas = useCallback(() => {
    const canvasContext = canvasRef.current as HTMLCanvasElement;
    const newContent = canvasContext.toDataURL('image/png');
    dispatch(updateNote(baseNoteProps.id, { content: newContent }));
  }, [baseNoteProps.id, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSaveCanvas = useCallback(debounce(saveCanvas, 2500), [saveCanvas]);

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>) => {
    const meta = drawingMeta.current;
    if (!meta.drawing) {
      return;
    }
    const canvasContext = canvasContextRef.current as CanvasRenderingContext2D;
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    drawLine(canvasContext, meta.x, meta.y, offsetX, offsetY);
    meta.x = 0;
    meta.y = 0;
    meta.drawing = false;
    debouncedSaveCanvas();
  };

  return (
    <Note classes={{ note: styles.note }} {...baseNoteProps}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </Note>
  );
};

export default NoteCanvas;
