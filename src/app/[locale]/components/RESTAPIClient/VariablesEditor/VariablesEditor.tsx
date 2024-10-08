import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type TRows from '@/interfaces/Rows';
import { variables } from '@/store/reducers/restFullSlice';
import { STEP_SIZE } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import Row from '../../Row/Row';
import RowEditor from '../../RowEditor/RowEditor';
import styles from './VariablesEditor.module.scss';

export const dynamic = 'force-dynamic';

function VariablesEditor(): JSX.Element {
  const t = useTranslations('Restapi');

  const variablesSelector = useAppSelector((state) => state.rest.variables);

  const dispatch = useAppDispatch();

  const updateRowState = (checked: boolean, key: string): void => {
    const copyVariables: TRows = JSON.parse(JSON.stringify(variablesSelector));
    const copyKey: string = key;
    const copyChecked: boolean = checked;
    const newVariables: TRows = [];
    for (let i = 0; i < copyVariables.length; i += STEP_SIZE) {
      if (copyVariables[i].key === copyKey) {
        copyVariables[i].checked = copyChecked;
        newVariables.push(copyVariables[i]);
      } else {
        newVariables.push(copyVariables[i]);
      }
    }
    dispatch(variables(newVariables));
  };
  const ZERO = 0;
  return (
    <div className={styles.container}>
      <table className={styles.table} role='grid'>
        <thead>
          <tr key={crypto.randomUUID()}>
            <td className={`${styles.td} ${styles.td_1}`} />
            <td className={`${styles.td} ${styles.td_2} ${styles.td_title}`}>{t('variable')}</td>
            <td className={`${styles.td} ${styles.td_3} ${styles.td_title}`}>{t('currentValue')}</td>
            <td className={`${styles.td} ${styles.td_4} ${styles.td_title}`} />
          </tr>
        </thead>
        <tbody>
          {variablesSelector.map((variable) => (
            <Row type='variables' key={crypto.randomUUID()} row={variable} updateRowState={updateRowState} />
          ))}
        </tbody>
        <tfoot>
          <RowEditor type='variables' />
        </tfoot>
      </table>
    </div>
  );
}

export default VariablesEditor;
