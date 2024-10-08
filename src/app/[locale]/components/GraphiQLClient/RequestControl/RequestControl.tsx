import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql';
import { Flip, toast, ToastContainer } from 'react-toastify';

import { useAppSelector } from '@/hooks/redux';
import { selectVariableNotFound } from '@/store/reducers/graphqlSlice';
import { replaceInHistory } from '@/utils/replaceHistory';
import Button from '../../UI/Button/Button';

import 'react-toastify/dist/ReactToastify.css';
import style from './RequestControl.module.scss';

interface IProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  sdlUrl: string;
  setSdlUrl: React.Dispatch<React.SetStateAction<string>>;
  setDocs: React.Dispatch<React.SetStateAction<IntrospectionQuery | null>>;
  setIsDocsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

function RequestControl({ url, setUrl, sdlUrl, setSdlUrl, setDocs, setIsDocsAvailable }: IProps): JSX.Element {
  const t = useTranslations('Graphiql');
  const variableNotFound = useAppSelector(selectVariableNotFound);
  const ZERO = 0;
  const ONE = 1;
  const [toastId, setToastId] = useState(ZERO);
  const getSchema = async (): Promise<void> => {
    await fetch(sdlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    })
      .then(async (res) => {
        const resData = await res.json();
        setDocs(resData.data as IntrospectionQuery);
        setIsDocsAvailable(true);
        return resData;
      })
      .catch((error: Error) => {
        toast(`Can not fetching this API schema. ${error.message}`, {
          type: 'error',
          toastId,
        });
        setToastId(toastId + ONE);
        setDocs(null);
        setIsDocsAvailable(false);
      });
  };

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (url === sdlUrl.replace(/\?sdl$/, '')) {
      setUrl(e.target.value);
      setSdlUrl(`${e.target.value}?sdl`);
    } else {
      setUrl(e.target.value);
    }
  };

  return (
    <div className={style.request_control}>
      <div className={style.url_control}>
        <input
          type='text'
          className={style.endpoint_input}
          placeholder={t('endpointURL')}
          value={url}
          onChange={handleEndpointChange}
          onBlur={(e) => {
            replaceInHistory('url', e.target.value);
          }}
        />
        <Button type='submit' className={style.button} disabled={url === '' || variableNotFound}>
          {t('send')}
        </Button>
      </div>
      <div className={style.sdl_control}>
        <input
          type='text'
          className={style.sdl_input}
          placeholder='SDL URL'
          value={sdlUrl}
          onChange={(e) => {
            setSdlUrl(e.target.value);
          }}
        />
        <Button type='button' className={style.button} disabled={sdlUrl === ''} onClick={getSchema}>
          {t('set')}
        </Button>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Flip}
      />
    </div>
  );
}

export { RequestControl };
