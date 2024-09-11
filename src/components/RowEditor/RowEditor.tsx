import { useEffect, useState } from 'react';
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
import type TRows from '@/interfaces/Rows';
import type { IRowWithCheckbox } from '@/interfaces/Rows';
import styles from './RowEditor.module.scss';

const START_POSITION = 0;

type TTypeTable = 'headers' | 'variables';
interface IProps {
  type: TTypeTable;
}

function RowEditor(props: IProps): JSX.Element {
  const { type } = props;
  const headersListSelector = useAppSelector((state) => state.headersList.reqHeaders);
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
  const [cursorPositionKey, setCursorPositionKey] = useState<number>(START_POSITION);
  const [cursorPositionValue, setCursorPositionValue] = useState<number>(START_POSITION);
  const [cursorPositionVarKey, setCursorPositionVarKey] = useState<number>(START_POSITION);
  const [cursorPositionVarValue, setCursorPositionVarValue] = useState<number>(START_POSITION);

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
          <>
            <input
              autoCapitalize='off'
              className={styles.input}
              type='text'
              value={keyInputValue}
              list='headers'
              onChange={(e) => {
                e.preventDefault();
                setKeyInputValue(e.target.value);
                if (e.target.selectionStart !== null) {
                  setCursorPositionKey(e.target.selectionStart);
                } else {
                  setCursorPositionKey(START_POSITION);
                }
              }}
              onFocus={(e) => {
                e.preventDefault();
                e.target.setSelectionRange(cursorPositionKey, cursorPositionKey);
              }}
              autoFocus
            />
            <datalist id='headers' className={styles.datalist}>
              {headersListSelector.map((item) => (
                <option key={item} className={styles.option}>
                  {item}
                </option>
              ))}
            </datalist>
          </>
        )}
        {type === 'headers' && !focusKeySelector && keyInputValue}
        {type === 'variables' && focusVariableSelector && (
          <input
            className={styles.input}
            type='text'
            value={keyInputValue}
            onChange={(e) => {
              e.preventDefault();
              setKeyInputValue(e.target.value);
              if (e.target.selectionStart !== null) {
                setCursorPositionVarKey(e.target.selectionStart);
              } else {
                setCursorPositionVarKey(START_POSITION);
              }
            }}
            onFocus={(e) => {
              e.preventDefault();
              e.target.setSelectionRange(cursorPositionVarKey, cursorPositionVarKey);
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
              e.preventDefault();
              setValueInputValue(e.target.value);
              if (e.target.selectionStart !== null) {
                setCursorPositionValue(e.target.selectionStart);
              } else {
                setCursorPositionValue(START_POSITION);
              }
            }}
            onFocus={(e) => {
              e.preventDefault();
              e.target.setSelectionRange(cursorPositionValue, cursorPositionValue);
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
              e.preventDefault();
              setValueInputValue(e.target.value);
              if (e.target.selectionStart !== null) {
                setCursorPositionVarValue(e.target.selectionStart);
              } else {
                setCursorPositionVarValue(START_POSITION);
              }
            }}
            onFocus={(e) => {
              e.preventDefault();
              e.target.setSelectionRange(cursorPositionVarValue, cursorPositionVarValue);
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
                const copyHeaders: TRows = JSON.parse(JSON.stringify(headersSelector));
                const newHeader: IRowWithCheckbox = {
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
                const copyVariables: TRows = JSON.parse(JSON.stringify(variablesSelector));
                const newVariables: IRowWithCheckbox = {
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
