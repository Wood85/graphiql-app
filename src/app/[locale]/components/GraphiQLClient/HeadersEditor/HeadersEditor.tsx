import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type TRows from '@/interfaces/Rows';
import { gqlHeaders } from '@/store/reducers/graphqlSlice';
import { STEP_SIZE } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import Row from '../../Row/Row';
import RowEditor from '../../RowEditor/RowEditor';
import styles from './HeadersEditor.module.scss';

function HeadersEditor(): JSX.Element {
  const t = useTranslations('Graphiql');
  const graphqlHeadersSelector = useAppSelector((state) => state.graphql.headers);

  const dispatch = useAppDispatch();

  const updateRowState = (checked: boolean, key: string): void => {
    const copyHeaders: TRows = JSON.parse(JSON.stringify(graphqlHeadersSelector));
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
    dispatch(gqlHeaders(newHeaders));
  };
  return (
    <div className={styles.table}>
      <div className={styles.table_heading}>
        <div className={styles.table_heading_key}>{t('key')}</div>
        <div>{t('value')}</div>
      </div>
      <div className={styles.container}>
        <table className={styles.table_header} role='grid'>
          <tbody>
            {graphqlHeadersSelector.map((header) => (
              <Row type='graphqlHeaders' key={crypto.randomUUID()} row={header} updateRowState={updateRowState} />
            ))}
          </tbody>
          <tfoot>
            <RowEditor type='graphqlHeaders' />
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export { HeadersEditor };
