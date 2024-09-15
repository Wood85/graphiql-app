'use client';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { loadingFinished, loadingStarted } from '@/store/reducers/loadingStateSlice';
import { replaceInHistory } from '@/utils/replaceHistory';
import useHeaders from '@/hooks/useHeaders';
import { Response } from '@/components/Response/Response';
import { BodyEditor } from './BodyEditor/BodyEditor';
import { RequestControl } from './RequestControl/RequestControl';

import style from './RESTAPIClient.module.scss';

export const dynamic = 'force-dynamic';

export default function RESTAPIClient(): JSX.Element {
  const headers = useHeaders();
  const [method, setMethod] = useState<TRequestMethod>(TRequestMethod.GET);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState(JSON.stringify({}));

  useEffect(() => {
    replaceInHistory('method', method);
  }, []);

  useEffect(() => {
    replaceInHistory('headers', headers);
  }, [headers]);

  const dispatcher = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const { href } = window.location;
    const apiUrl = href.replace(/\/restapi\/|\/graphiql\//g, '/api/');
    dispatcher(loadingStarted());
    let bodyType: string | null = null;

    try {
      const res = await fetch(apiUrl, {
        method,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      if (method === TRequestMethod.HEAD) {
        setResponse({
          body: null,
          status: 200,
          statusText: 'OK',
          headers: Object.fromEntries(res.headers.entries()),
        });

        return;
      }

      const data = await res.json();
      bodyType = data.body?.type ?? null;

      if (data !== null) {
        setResponse(data as IResponse);
      }
    } catch (error) {
      setResponse({
        body: null,
        status: 500,
        statusText: (error as Error).message,
        headers: {},
      });
    } finally {
      if (bodyType !== 'image') {
        dispatcher(loadingFinished());
      }
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <RequestControl method={method} setMethod={setMethod} url={url} setUrl={setUrl} body={body} />
        <BodyEditor setBody={setBody} />
      </form>
      {response?.status != null && <Response response={response} method={method} />}
    </div>
  );
}
