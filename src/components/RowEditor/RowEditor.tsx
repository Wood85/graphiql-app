import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { focusCellKey, focusCellValue } from '@/store/reducers/restFullSlice';
import Checkbox from '@/components/UI/Checkbox/Checkbox';
import styles from './RowEditor.module.scss';

function RowEditor(): JSX.Element {
  const focusKeySelector = useAppSelector((state) => state.rest.focusCellKey);
  const focusValueSelector = useAppSelector((state) => state.rest.focusCellValue);

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
          dispatch(focusCellKey(true));
          dispatch(focusCellValue(false));
        }}
      >
        {focusKeySelector ? (
          <input
            type='text'
            value={keyInputValue}
            onChange={(e) => {
              setKeyInputValue(e.target.value);
            }}
            autoFocus
          />
        ) : (
          keyInputValue
        )}
      </td>
      <td
        className={`${styles.td} ${styles.td_3}`}
        role='gridcell'
        aria-label='value'
        onClick={() => {
          dispatch(focusCellValue(true));
          dispatch(focusCellKey(false));
        }}
      >
        {focusValueSelector ? (
          <input
            type='text'
            value={valueInputValue}
            onChange={(e) => {
              setValueInputValue(e.target.value);
            }}
            autoFocus
          />
        ) : (
          valueInputValue
        )}
      </td>
    </tr>
  );
}

export default RowEditor;
