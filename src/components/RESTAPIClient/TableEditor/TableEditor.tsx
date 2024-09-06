import Row from '@/components/Row/Row';
import { headers } from '@/store/reducers/restFullSlice';
import type THeaders from '@/interfaces/Headers';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { STEP_SIZE } from '@/utils/constants';
import styles from './TableEditor.module.scss';

// interface IProps {
//   headerKey: string;
//   setHeaderKey: React.Dispatch<React.SetStateAction<string>>;
//   headerValue: string;
//   setHeaderValue: React.Dispatch<React.SetStateAction<string>>;
// }

function TableEditor(): JSX.Element {
  // { headerKey, setHeaderKey, headerValue, setHeaderValue }: IProps
  const headersSelector = useAppSelector((state) => state.rest.headers);
  const dispatch = useAppDispatch();
  const updateRowState = (checked: boolean, key: string): void => {
    const copyHeaders: THeaders = JSON.parse(JSON.stringify(headersSelector));
    const copyKey: string = key;
    const copyChecked: boolean = checked;
    const newHeaders: THeaders = [];
    for (let i = 0; i < copyHeaders.length; i += STEP_SIZE) {
      if (copyHeaders[i].key === copyKey) {
        copyHeaders[i].checked = copyChecked;
        newHeaders.push(copyHeaders[i]);
      } else {
        newHeaders.push(copyHeaders[i]);
      }
    }
    dispatch(headers(newHeaders));
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr key={crypto.randomUUID()}>
            <td className={`${styles.td} ${styles.td_1}`} />
            <td className={`${styles.td} ${styles.td_2} ${styles.td_title}`}>Key</td>
            <td className={`${styles.td} ${styles.td_3} ${styles.td_title}`}>Value</td>
          </tr>
        </thead>
        <tbody>
          {headersSelector.map((header) => (
            <Row key={crypto.randomUUID()} header={header} updateRowState={updateRowState} />
          ))}
          <tr key={crypto.randomUUID()}>
            <td className={`${styles.td} ${styles.td_1}`} />
            <td className={`${styles.td} ${styles.td_2}`} />
            <td className={`${styles.td} ${styles.td_3}`} />
          </tr>
        </tbody>
      </table>
    </div>
    // <div className={style.table}>
    //   <input
    //     type='text'
    //     className={style.input}
    //     placeholder='Header Key'
    //     value={headerKey}
    //     onChange={(e) => {
    //       setHeaderKey(e.target.value);
    //     }}
    //   />
    //   <input
    //     type='text'
    //     className={style.input}
    //     placeholder='Header Value'
    //     value={headerValue}
    //     onChange={(e) => {
    //       setHeaderValue(e.target.value);
    //     }}
    //   />
    // </div>
  );
}

export { TableEditor };
