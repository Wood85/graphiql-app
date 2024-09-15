'use client';

import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { type IRequestLS } from '@/interfaces/LocalStorage';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { headers, variables } from '@/store/reducers/restFullSlice';
import { loadingFinished, loadingStarted } from '@/store/reducers/loadingStateSlice';
import { replaceInHistory } from '@/utils/replaceHistory';
import useHeaders from '@/hooks/useHeaders';
import { Response } from '@/components/Response/Response';
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
    if (localStorage.getItem('RESTFUL_request') !== null) {
      JSON.parse(localStorage.getItem('RESTFUL_request') ?? '').forEach((el: IRequestLS) => allRequests.push(el));
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

    localStorage.setItem('RESTFUL_request', JSON.stringify(allRequests));
  };

  useEffect(() => {
    const match = window.location.search.match(/\?history=[0-9]+/gm);

    if (match !== null) {
      const historyRequest = match?.toString().replace('?history=', '');
      const data = JSON.parse(localStorage.getItem('RESTFUL_request') ?? '');
      const currentData = data.filter((el: IRequestLS) => el.time.toString() === historyRequest)[0] as IRequestLS;

      setUrl(currentData.url);

      switch (currentData.method) {
        case TRequestMethod.GET:
          setMethod(TRequestMethod.GET);
          break;
        case TRequestMethod.POST:
          setMethod(TRequestMethod.POST);
          break;
        case TRequestMethod.PUT:
          setMethod(TRequestMethod.PUT);
          break;
        case TRequestMethod.PATCH:
          setMethod(TRequestMethod.PATCH);
          break;
        case TRequestMethod.DELETE:
          setMethod(TRequestMethod.DELETE);
          break;
        case TRequestMethod.HEAD:
          setMethod(TRequestMethod.HEAD);
          break;
        case TRequestMethod.OPTIONS:
          setMethod(TRequestMethod.OPTIONS);
          break;

        default:
          break;
      }
      setBody(currentData.body);
      dispatcher(variables(currentData.variables));
      dispatcher(headers(currentData.headers));
    }
  }, [dispatcher]);

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
