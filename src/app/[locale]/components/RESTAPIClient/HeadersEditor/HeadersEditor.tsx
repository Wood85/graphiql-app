import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type TRows from '@/interfaces/Rows';
import { headers } from '@/store/reducers/restFullSlice';
import { STEP_SIZE } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import styles from './HeadersEditor.module.scss';
import Row from '../../Row/Row';
import RowEditor from '../../RowEditor/RowEditor';

export const dynamic = 'force-dynamic';

function HeadersEditor(): JSX.Element {
  const t = useTranslations('Restapi');

  const headersSelector = useAppSelector((state) => state.rest.headers);

  const dispatch = useAppDispatch();

  const updateRowState = (checked: boolean, key: string): void => {
    const copyHeaders: TRows = JSON.parse(JSON.stringify(headersSelector));
    const copyKey: string = key;
    const copyChecked: boolean = checked;
    const newHeaders: TRows = [];

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
  const ZERO = 0;
  return (
    <div className={styles.container}>
      <table className={styles.table} role='grid'>
        <thead>
          <tr key={crypto.randomUUID()}>
            <td className={`${styles.td} ${styles.td_1}`} />
            <td className={`${styles.td} ${styles.td_2} ${styles.td_title}`}>{t('key')}</td>
            <td className={`${styles.td} ${styles.td_3} ${styles.td_title}`}>{t('value')}</td>
            <td className={`${styles.td} ${styles.td_4} ${styles.td_title}`} />
          </tr>
        </thead>
        <tbody>
          {headersSelector.map((header) => (
            <Row type='headers' key={crypto.randomUUID()} row={header} updateRowState={updateRowState} />
          ))}
        </tbody>
        <tfoot>
          <RowEditor type='headers' />
        </tfoot>
      </table>
    </div>
  );
}

export default HeadersEditor;
