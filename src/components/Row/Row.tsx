import type { IHeaderWithCheckbox } from '@/interfaces/Headers';
import Checkbox from '../UI/Checkbox/Checkbox';
import styles from './Row.module.scss';

interface IProps {
  header: IHeaderWithCheckbox;
  updateRowState: (checked: boolean, key: string) => void;
}

function Row(props: IProps): JSX.Element {
  const { header, updateRowState } = props;

  const updateCheckboxState = (check: boolean): boolean => {
    updateRowState(check, header.key);
    return check;
  };

  return (
    <tr>
      <td className={`${styles.td} ${styles.td_1}`}>
        <Checkbox checked={header.checked} updateState={updateCheckboxState} />
      </td>
      <td className={`${styles.td} ${styles.td_2} ${!header.checked && styles.turn_off_text}`}>
        <label htmlFor={header.key}>{header.key}</label>
      </td>
      <td className={`${styles.td} ${styles.td_3} ${!header.checked && styles.turn_off_text}`}>
        <label htmlFor={header.key}>{header.value}</label>
      </td>
    </tr>
  );
}

export default Row;
