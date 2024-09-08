import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import type { IHeaderWithCheckbox } from '@/interfaces/Headers';
import type THeaders from '@/interfaces/Headers';
import { headers, variables } from '@/store/reducers/restFullSlice';
import { STEP_SIZE } from '@/utils/constants';
import CleanIcon from '@/assets/images/icons/CleanIcon';
import Checkbox from '../UI/Checkbox/Checkbox';
import styles from './Row.module.scss';

type TRowType = 'headers' | 'variables';

interface IProps {
  type: TRowType;
  row: IHeaderWithCheckbox;
  updateRowState: (checked: boolean, key: string) => void;
}

function Row(props: IProps): JSX.Element {
  const { type, row, updateRowState } = props;

  const headersSelector = useAppSelector((state) => state.rest.headers);
  const variablesSelector = useAppSelector((state) => state.rest.variables);

  const dispatch = useAppDispatch();

  const updateCheckboxState = (check: boolean): boolean => {
    updateRowState(check, row.key);
    return check;
  };

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (type === 'headers') {
      const copyHeaders: THeaders = JSON.parse(JSON.stringify(headersSelector));
      const newHeaders: THeaders = [];
      for (let i = 0; i < copyHeaders.length; i += STEP_SIZE) {
        if (copyHeaders[i].key !== row.key) {
          newHeaders.push(copyHeaders[i]);
        }
      }
      dispatch(headers(newHeaders));
    }
    if (type === 'variables') {
      const copyVariables: THeaders = JSON.parse(JSON.stringify(variablesSelector));
      const newVariables: THeaders = [];
      for (let i = 0; i < copyVariables.length; i += STEP_SIZE) {
        if (copyVariables[i].key !== row.key) {
          newVariables.push(copyVariables[i]);
        }
      }
      dispatch(variables(newVariables));
    }
  }

  return (
    <tr>
      <td className={`${styles.td} ${styles.td_1}`}>
        <Checkbox checked={row.checked} updateState={updateCheckboxState} />
      </td>
      <td className={`${styles.td} ${styles.td_2} ${!row.checked && styles.turn_off_text}`}>
        <label htmlFor={row.key}>{row.key}</label>
      </td>
      <td className={`${styles.td} ${styles.td_3} ${!row.checked && styles.turn_off_text}`}>
        <label htmlFor={row.key}>{row.value}</label>
      </td>
      <td className={`${styles.td} ${styles.td_4}`}>
        {row.userDefined === true && (
          <button className={styles.clear_btn} type='button' aria-label='clear' onClick={clickHandler}>
            <CleanIcon className={styles.clear_icon} />
          </button>
        )}
      </td>
    </tr>
  );
}

export default Row;
