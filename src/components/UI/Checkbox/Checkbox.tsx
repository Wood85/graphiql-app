import { useState } from 'react';

import styles from './Checkbox.module.scss';

interface IProps {
  checked: boolean;
  updateState: (check: boolean) => void;
}

function Checkbox(props: IProps): JSX.Element {
  const { checked, updateState } = props;
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <label>
      <input
        className={styles.checkbox_hide}
        type='checkbox'
        data-testid='checkbox'
        onChange={() => {
          updateState(!isChecked);
          setIsChecked(!isChecked);
        }}
      />
      <div className={`${styles.checkbox} ${isChecked ? styles.checkbox_active : ''}`} />
    </label>
  );
}

export default Checkbox;
