import { useState } from 'react';

import SaveIcon from '@/assets/images/icons/SaveIcon';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type TRows from '@/interfaces/Rows';
import type { IRowWithCheckbox } from '@/interfaces/Rows';
import { gqlFocusCellKey, gqlFocusCellValue, gqlHeaders } from '@/store/reducers/graphqlSlice';
import {
  focusCellCurrentValue,
  focusCellKey,
  focusCellValue,
  focusCellVariable,
  headers,
  variables,
} from '@/store/reducers/restFullSlice';

import Checkbox from '../UI/Checkbox/Checkbox';
import styles from './RowEditor.module.scss';

const START_POSITION = 0;

type TTypeTable = 'headers' | 'variables' | 'graphqlHeaders';
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

  const gqlHeadersSelector = useAppSelector((state) => state.graphql.headers);
  const gqlFocusKeySelector = useAppSelector((state) => state.graphql.focusCellKey);
  const gqlFocusValueSelector = useAppSelector((state) => state.graphql.focusCellValue);

  const dispatch = useAppDispatch();

  const [keyInputValue, setKeyInputValue] = useState<string>('');
  const [valueInputValue, setValueInputValue] = useState<string>('');
  const [isCurrentChecked, setIsCurrentChecked] = useState<boolean>(true);
  const [cursorPositionKey, setCursorPositionKey] = useState<number>(START_POSITION);
  const [cursorPositionValue, setCursorPositionValue] = useState<number>(START_POSITION);
  const [cursorPositionVarKey, setCursorPositionVarKey] = useState<number>(START_POSITION);
  const [cursorPositionVarValue, setCursorPositionVarValue] = useState<number>(START_POSITION);
  const [autofocus, setAutofocus] = useState({ key: false, value: false });

  const onKeyDownInputHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <tr key={crypto.randomUUID()} data-testid='row_editor'>
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
          if (type === 'graphqlHeaders') {
            dispatch(gqlFocusCellKey(true));
            dispatch(gqlFocusCellValue(false));
          }
          setAutofocus({ key: true, value: false });
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
              onKeyDown={onKeyDownInputHandler}
              onBlur={() => {
                setAutofocus({ key: false, value: false });
              }}
              autoFocus={autofocus.key}
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
            onKeyDown={onKeyDownInputHandler}
            onBlur={() => {
              setAutofocus({ key: false, value: false });
            }}
            autoFocus={autofocus.key}
          />
        )}
        {type === 'variables' && !focusVariableSelector && keyInputValue}
        {type === 'graphqlHeaders' && gqlFocusKeySelector && (
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
              onKeyDown={onKeyDownInputHandler}
              onBlur={() => {
                setAutofocus({ key: false, value: false });
              }}
              autoFocus={autofocus.key}
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
        {type === 'graphqlHeaders' && !gqlFocusKeySelector && keyInputValue}
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
          if (type === 'graphqlHeaders') {
            dispatch(gqlFocusCellKey(false));
            dispatch(gqlFocusCellValue(true));
          }
          setAutofocus({ key: false, value: true });
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
            onKeyDown={onKeyDownInputHandler}
            onBlur={() => {
              setAutofocus({ key: false, value: false });
            }}
            autoFocus={autofocus.value}
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
            onKeyDown={onKeyDownInputHandler}
            onBlur={() => {
              setAutofocus({ key: false, value: false });
            }}
            autoFocus={autofocus.value}
          />
        )}
        {type === 'variables' && !focusCurrentValueSelector && valueInputValue}
        {type === 'graphqlHeaders' && gqlFocusValueSelector && (
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
            onKeyDown={onKeyDownInputHandler}
            onBlur={() => {
              setAutofocus({ key: false, value: false });
            }}
            autoFocus={autofocus.value}
          />
        )}
        {type === 'graphqlHeaders' && !gqlFocusValueSelector && valueInputValue}
      </td>
      <td className={`${styles.td} ${styles.td_4}`} role='gridcell' aria-label='btns'>
        {keyInputValue !== '' && valueInputValue !== '' && (
          <button
            className={styles.save_btn}
            type='button'
            aria-label='save'
            onClick={(e) => {
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
              if (type === 'graphqlHeaders') {
                const copyHeaders: TRows = JSON.parse(JSON.stringify(gqlHeadersSelector));
                const newHeader: IRowWithCheckbox = {
                  checked: isCurrentChecked,
                  key: keyInputValue,
                  value: valueInputValue,
                  userDefined: true,
                };
                copyHeaders.push(newHeader);
                setKeyInputValue('');
                setValueInputValue('');
                dispatch(gqlFocusCellKey(false));
                dispatch(gqlFocusCellValue(false));
                dispatch(gqlHeaders(copyHeaders));
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
