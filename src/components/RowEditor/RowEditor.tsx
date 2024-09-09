import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  headers,
  focusCellKey,
  focusCellValue,
  focusCellVariable,
  focusCellCurrentValue,
  variables,
} from '@/store/reducers/restFullSlice';
import Checkbox from '@/components/UI/Checkbox/Checkbox';
import SaveIcon from '@/assets/images/icons/SaveIcon';
import {
  AMOUNT_OF_BRACKETS,
  EMPTY_ARR_LENGTH,
  STEP_SIZE,
  TOTAL_AMOUNT_OF_BRACKETS,
  VAR_REGEXP,
} from '@/utils/constants';
import type THeaders from '@/interfaces/Headers';
import type { IHeaderWithCheckbox } from '@/interfaces/Headers';
import styles from './RowEditor.module.scss';

type TVar = [string, number];

type TTypeTable = 'headers' | 'variables';
interface IProps {
  type: TTypeTable;
}

function RowEditor(props: IProps): JSX.Element {
  const { type } = props;
  const headersSelector = useAppSelector((state) => state.rest.headers);
  const focusKeySelector = useAppSelector((state) => state.rest.focusCellKey);
  const focusValueSelector = useAppSelector((state) => state.rest.focusCellValue);

  const variablesSelector = useAppSelector((state) => state.rest.variables);
  const focusVariableSelector = useAppSelector((state) => state.rest.focusCellVariable);
  const focusCurrentValueSelector = useAppSelector((state) => state.rest.focusCellCurrentValue);

  const dispatch = useAppDispatch();

  const [keyInputValue, setKeyInputValue] = useState<string>('');
  const [valueInputValue, setValueInputValue] = useState<string>('');
  const [isCurrentChecked, setIsCurrentChecked] = useState<boolean>(true);

  return (
    <tr key={crypto.randomUUID()}>
      <td className={`${styles.td} ${styles.td_1}`} role='gridcell' aria-label='checkbox'>
        {(keyInputValue !== '' || valueInputValue !== '') && (
          <Checkbox
            checked={isCurrentChecked}
            updateState={() => {
              setIsCurrentChecked(!isCurrentChecked);
            }}
          />
        )}
      </td>
      <td
        className={`${styles.td} ${styles.td_2}`}
        role='gridcell'
        aria-label='key'
        onClick={() => {
          if (type === 'headers') {
            dispatch(focusCellKey(true));
            dispatch(focusCellValue(false));
          }
          if (type === 'variables') {
            dispatch(focusCellVariable(true));
            dispatch(focusCellCurrentValue(false));
          }
        }}
      >
        {type === 'headers' && focusKeySelector && (
          <input
            className={styles.input}
            type='text'
            value={keyInputValue}
            onChange={(e) => {
              setKeyInputValue(e.target.value);
            }}
            autoFocus
          />
        )}
        {type === 'headers' && !focusKeySelector && keyInputValue}
        {type === 'variables' && focusVariableSelector && (
          <input
            className={styles.input}
            type='text'
            value={keyInputValue}
            onChange={(e) => {
              setKeyInputValue(e.target.value);
            }}
            autoFocus
          />
        )}
        {type === 'variables' && !focusVariableSelector && keyInputValue}
      </td>
      <td
        className={`${styles.td} ${styles.td_3}`}
        role='gridcell'
        aria-label='value'
        onClick={() => {
          if (type === 'headers') {
            dispatch(focusCellKey(false));
            dispatch(focusCellValue(true));
          }
          if (type === 'variables') {
            dispatch(focusCellVariable(false));
            dispatch(focusCellCurrentValue(true));
          }
        }}
      >
        {type === 'headers' && focusValueSelector && (
          <input
            className={styles.input}
            type='text'
            value={valueInputValue}
            onChange={(e) => {
              setValueInputValue(e.target.value);
            }}
            autoFocus
          />
        )}
        {type === 'headers' && !focusValueSelector && valueInputValue}
        {type === 'variables' && focusCurrentValueSelector && (
          <input
            className={styles.input}
            type='text'
            value={valueInputValue}
            onChange={(e) => {
              setValueInputValue(e.target.value);
            }}
            autoFocus
          />
        )}
        {type === 'variables' && !focusCurrentValueSelector && valueInputValue}
      </td>
      <td className={`${styles.td} ${styles.td_4}`} role='gridcell' aria-label='btns'>
        {keyInputValue !== '' && valueInputValue !== '' && (
          <button
            className={styles.save_btn}
            type='button'
            aria-label='save'
            onClick={async (e) => {
              e.preventDefault();
              if (type === 'headers') {
                const copyHeaders: THeaders = JSON.parse(JSON.stringify(headersSelector));
                const newHeader: IHeaderWithCheckbox = {
                  checked: isCurrentChecked,
                  key: keyInputValue,
                  value: valueInputValue,
                  userDefined: true,
                };
                copyHeaders.push(newHeader);
                setKeyInputValue('');
                setValueInputValue('');
                dispatch(focusCellKey(false));
                dispatch(focusCellValue(false));
                dispatch(headers(copyHeaders));
              }
              if (type === 'variables') {
                const copyVariables: THeaders = JSON.parse(JSON.stringify(variablesSelector));
                const newVariables: IHeaderWithCheckbox = {
                  checked: isCurrentChecked,
                  key: keyInputValue,
                  value: valueInputValue,
                  userDefined: true,
                };
                copyVariables.push(newVariables);
                setKeyInputValue('');
                setValueInputValue('');
                dispatch(focusCellVariable(false));
                dispatch(focusCellCurrentValue(false));
                dispatch(variables(copyVariables));
              }
            }}
          >
            <SaveIcon className={styles.save_icon} />
          </button>
        )}
      </td>
    </tr>
  );
}

export default RowEditor;
