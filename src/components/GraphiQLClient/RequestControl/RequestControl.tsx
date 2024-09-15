import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql';

import { replaceInHistory } from '@/utils/replaceHistory';
import Button from '@/components/UI/Button/Button';

import style from './RequestControl.module.scss';

interface IProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  sdlUrl: string;
  setSdlUrl: React.Dispatch<React.SetStateAction<string>>;
  setDocs: React.Dispatch<React.SetStateAction<IntrospectionQuery | null>>;
}

function RequestControl({ url, setUrl, sdlUrl, setSdlUrl, setDocs }: IProps): JSX.Element {
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
        return resData;
      })
      .catch((error: Error) => {
        console.error('Can not fetching this API schema.', error);
        setDocs(null);
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
          placeholder='Endpoint URL'
          value={url}
          onChange={handleEndpointChange}
          onBlur={(e) => {
            replaceInHistory('url', e.target.value);
          }}
        />
        <Button type='submit' className={style.button} disabled={url === ''}>
          Send
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
          Set
        </Button>
      </div>
    </div>
  );
}

export { RequestControl };
