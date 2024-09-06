import { TRequestMethod } from '@/interfaces/RequestMethod';

import Button from '@/components/UI/Button/Button';
import { selectedMethod } from '@/store/reducers/restFullSlice';
import { useDispatch } from 'react-redux';
import style from './RequestControl.module.scss';

interface IProps {
  method: TRequestMethod;
  setMethod: React.Dispatch<React.SetStateAction<TRequestMethod>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

function RequestControl({ method, setMethod, url, setUrl }: IProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className={style.request_control}>
      <select
        className={style.method_selector}
        value={method}
        onChange={(e) => {
          setMethod(e.target.value as TRequestMethod);
          dispatch(selectedMethod(e.target.value as TRequestMethod));
        }}
      >
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
        placeholder='Endpoint URL'
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <Button type='submit' className={style.button} disabled={url === ''}>
        Send
      </Button>
    </div>
  );
}

export { RequestControl };
