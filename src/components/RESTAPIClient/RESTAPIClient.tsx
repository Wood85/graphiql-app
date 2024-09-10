'use client';

import { useCallback, useEffect, useState } from 'react';

import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { Response } from '../Response/Response';
import { BodyEditor } from './BodyEditor/BodyEditor';
import { RequestControl } from './RequestControl/RequestControl';
import { TableEditor } from './TableEditor/TableEditor';

import style from './RESTAPIClient.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { loadingStarted, loadingFinished } from '../../store/reducers/loadingStateSlice';

export default function RESTAPIClient(): JSX.Element {
  const [method, setMethod] = useState<TRequestMethod>(TRequestMethod.GET);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState(JSON.stringify({}));
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const dispatcher = useAppDispatch();

  const replaceURL = useCallback(async (): Promise<string> => {
    //  The replacement below is necessary because the atob method uses the '/' character when
    //  encoding the string. This address string is misinterpreted during routing, so we use
    //  the '+' character instead and reverse the substitution on the server side before encoding.
    const urlEncoded = btoa(url).replace(/\//g, '+');
    const bodyEncoded = isBodyApplicable(method) ? btoa(body.replace(/'+/g, '"')) : '';
    const queryParams =
      headerKey !== ''
        ? new URLSearchParams({
            [headerKey]: headerValue,
          }).toString()
        : '';

    const baseUrl = `${method}/${urlEncoded}${isBodyApplicable(method) ? `/${bodyEncoded}` : ''}${headerKey !== '' ? `?${queryParams}` : ''}`;

    const match = window.location.pathname.match(/^\/[^/]+/);
    const currentRoute = match?.[0] ?? '';
    const routerUrl = `${currentRoute}/${baseUrl}`;

    window.history.replaceState(null, '', routerUrl);

    return baseUrl;
  }, [body, headerKey, headerValue, method, url]);

  /** START OF DIAGNOSTIC SECTION. WILL BE REMOVE LATER **/
  useEffect(() => {
    if (response !== null) {
      console.log('response =>', response);
    }

    replaceURL().catch(console.error);
  }, [response, url, replaceURL]);
  /** END OF DIAGNOSTIC SECTION **/

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const baseUrl = await replaceURL();
    const { origin } = window.location;
    const apiUrl = `${origin}/api/${baseUrl}`;
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

  const isBodyApplicable = (requestMethod: TRequestMethod): boolean =>
    requestMethod === TRequestMethod.POST ||
    requestMethod === TRequestMethod.PUT ||
    requestMethod === TRequestMethod.PATCH;

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <RequestControl method={method} setMethod={setMethod} url={url} setUrl={setUrl} />
        <BodyEditor body={body} setBody={setBody} />
        <TableEditor
          headerKey={headerKey}
          setHeaderKey={setHeaderKey}
          headerValue={headerValue}
          setHeaderValue={setHeaderValue}
        />
      </form>
      {response?.status != null && <Response response={response} method={method} />}
    </div>
  );
}
