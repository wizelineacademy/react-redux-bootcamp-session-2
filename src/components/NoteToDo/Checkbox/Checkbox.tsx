import { FunctionComponent, useState } from 'react';

type CheckboxProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox: FunctionComponent<CheckboxProps> = ({ checked, onChange }) => {
  const [checkedValue, setChecked] = useState(checked);

  const toggleChecked = () => {
    const newCheckedValue = !checkedValue;
    setChecked(newCheckedValue);
    onChange?.(newCheckedValue);
  };

  return <input type="checkbox" checked={checkedValue} onChange={toggleChecked} />;
};

export default Checkbox;
