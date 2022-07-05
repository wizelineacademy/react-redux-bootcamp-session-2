import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './Deletable.scss';

type DeletableClassKey = 'root' | 'button';
type DeletableProps = PropsWithChildren<{
  onDelete?: () => void;
  classes?: Partial<Record<DeletableClassKey, string>>;
}>;

const Deletable: FunctionComponent<DeletableProps> = ({ children, classes, onDelete }) => {
  return (
    <div className={clsx(styles.container, classes?.root)}>
      <button className={clsx(styles.button, classes?.button)} type="button" onClick={onDelete}>
        delete
      </button>
      {children}
    </div>
  );
};

export default Deletable;
