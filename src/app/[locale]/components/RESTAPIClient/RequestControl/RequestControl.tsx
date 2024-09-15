import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';

import { TRequestMethod } from '@/interfaces/RequestMethod';
import { selectedMethod } from '@/store/reducers/restFullSlice';
import { replaceInHistory } from '@/utils/replaceHistory';
import Button from '@/components/UI/Button/Button';

import style from './RequestControl.module.scss';

interface IProps {
  method: TRequestMethod;
  setMethod: React.Dispatch<React.SetStateAction<TRequestMethod>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  body: string;
}

export const dynamic = 'force-dynamic';

function RequestControl({ method, setMethod, url, setUrl, body }: IProps): JSX.Element {
  const t = useTranslations('Restapi');
  const dispatch = useDispatch();

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value as TRequestMethod;
    setMethod(value);
    dispatch(selectedMethod(value));
    replaceInHistory('method', value);
    if (value === TRequestMethod.POST || value === TRequestMethod.PUT || value === TRequestMethod.PATCH) {
      replaceInHistory('body', body);
    }
  };

  return (
    <div className={style.request_control}>
      <select className={style.method_selector} value={method} onChange={handleOptionChange}>
        <option value={TRequestMethod.GET}>{TRequestMethod.GET}</option>
        <option value={TRequestMethod.POST}>{TRequestMethod.POST}</option>
        <option value={TRequestMethod.PUT}>{TRequestMethod.PUT}</option>
        <option value={TRequestMethod.PATCH}>{TRequestMethod.PATCH}</option>
        <option value={TRequestMethod.DELETE}>{TRequestMethod.DELETE}</option>
        <option value={TRequestMethod.HEAD}>{TRequestMethod.HEAD}</option>
        <option value={TRequestMethod.OPTIONS}>{TRequestMethod.OPTIONS}</option>
      </select>
      <input
        type='text'
        className={style.endpoint_input}
        placeholder={t('endpointURL')}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        onBlur={(e) => {
          replaceInHistory('url', e.target.value);
        }}
      />
      <Button type='submit' className={style.button} disabled={url === ''}>
        {t('send')}
      </Button>
    </div>
  );
}

export { RequestControl };
