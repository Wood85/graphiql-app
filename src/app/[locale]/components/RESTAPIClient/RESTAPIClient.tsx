'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useHeaders from '@/hooks/useHeaders';
import { type IHeadersVariables, type IRequestLS } from '@/interfaces/LocalStorage';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { loadingFinished, loadingStarted } from '@/store/reducers/loadingStateSlice';
import { headers, variables } from '@/store/reducers/restFullSlice';
import { replaceInHistory } from '@/utils/replaceHistory';
import { useEffect, useState } from 'react';
import { Response } from '../Response/Response';
import { BodyEditor } from './BodyEditor/BodyEditor';
import { RequestControl } from './RequestControl/RequestControl';
import style from './RESTAPIClient.module.scss';

export const dynamic = 'force-dynamic';

export default function RESTAPIClient(): JSX.Element {
  const headersSelector = useAppSelector((state) => state.rest.headers);
  const variablesSelector = useAppSelector((state) => state.rest.variables);
  const headersFromHook = useHeaders('rest');
  const [method, setMethod] = useState<TRequestMethod>(TRequestMethod.GET);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState(JSON.stringify({}));

  useEffect(() => {
    replaceInHistory('method', method);
  }, []);

  useEffect(() => {
    replaceInHistory('headers', headersFromHook);
  }, [headersFromHook]);

  const dispatcher = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    replaceInHistory('method', method);
    replaceInHistory('url', url);
    replaceInHistory('body', body);
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

    const allRequests = [];
    if (localStorage.getItem('history_requests') !== null) {
      JSON.parse(localStorage.getItem('history_requests') ?? '').forEach((el: IRequestLS) => allRequests.push(el));
    }
    const currentTime = new Date().getTime();
    const currentData = {
      client: 'restapi',
      time: currentTime,
      method,
      url,
      headers: headersSelector,
      body,
      variables: variablesSelector,
    };
    allRequests.push(currentData);

    localStorage.setItem('history_requests', JSON.stringify(allRequests));
  };

  useEffect(() => {
    if (localStorage.getItem('current_request') !== null) {
      const currentData = JSON.parse(localStorage.getItem('current_request') ?? '') as IRequestLS;

      setUrl(currentData.url);
      if ((currentData.method as TRequestMethod) in TRequestMethod) {
        setMethod(currentData.method as TRequestMethod);
      }
      setBody(currentData.body);
      dispatcher(headers(currentData.headers));
      dispatcher(variables(currentData.variables as IHeadersVariables[]));
      localStorage.removeItem('current_request');
    }
  }, [dispatcher]);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <RequestControl method={method} setMethod={setMethod} url={url} setUrl={setUrl} body={body} />
        <BodyEditor setBody={setBody} body={body} />
      </form>
      {response?.status != null && <Response response={response} method={method} />}
    </div>
  );
}
