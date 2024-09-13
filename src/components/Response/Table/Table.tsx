import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import style from './Table.module.scss';

interface IProps {
  headers: Record<string, string> | undefined;
}

export const dynamic = 'force-dynamic';

function Table({ headers }: IProps): JSX.Element {
  const t = useTranslations('Table');

  const ZERO = 0;
  return (
    <div className={style.wrapper}>
      {Object.keys(headers ?? {}).length > ZERO && (
        <table className={style.table}>
          <thead>
            <tr>
              <td className={clsx(style.td, style.td_1)}> </td>
              <td className={clsx(style.td, style.td_2, style.td_title)}>{t('key')}</td>
              <td className={clsx(style.td, style.td_3, style.td_title)}>{t('value')}</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(headers ?? {}).map(([key, value]) => (
              <tr key={crypto.randomUUID()}>
                <td className={clsx(style.td, style.td_1)}> </td>
                <td className={clsx(style.td, style.td_2)}>{key}</td>
                <td className={clsx(style.td, style.td_3)}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {Object.keys(headers ?? {}).length === ZERO && <p className={style.no_headers}>{t('noHeaders')}</p>}
    </div>
  );
}

export { Table };
