'use client';

import { useEffect, useState } from 'react';

import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { RequestControl } from './RequestControl/RequestControl';
import { BodyEditor } from './BodyEditor/BodyEditor';
import { TableEditor } from './TableEditor/TableEditor';
import { Response } from '../Response/Response';

import style from './RESTAPIClient.module.scss';

export default function RESTAPIClient(): JSX.Element {
  const [method, setMethod] = useState<TRequestMethod>(TRequestMethod.GET);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState(JSON.stringify({}));
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');

  /** START OF DIAGNOSTIC SECTION. WILL BE REMOVE LATER **/
  useEffect(() => {
    if (response !== null) {
      console.log('response =>', response);
    }
  }, [response]);
  /** END OF DIAGNOSTIC SECTION **/

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    //  The replacement below is necessary because the atob method uses the '/' character when
    //  encoding the string. This address string is misinterpreted during routing, so we use0
    //  the '+' character instead and reverse the substitution on the server side before encoding.
    const urlEncoded = btoa(url).replace(/\//g, '+');
    const bodyEncoded = isBodyApplicable(method) ? btoa(body.replace(/'+/g, '"')) : '';
    const queryParams =
      headerKey !== ''
        ? new URLSearchParams({
            [headerKey]: headerValue,
          }).toString()
        : '';

    const { origin } = window.location;

    const baseUrl = `${method}/${urlEncoded}${isBodyApplicable(method) ? `/${bodyEncoded}` : ''}${headerKey !== '' ? `?${queryParams}` : ''}`;

    const apiUrl = `${origin}/api/${baseUrl}`;

    const match = window.location.pathname.match(/^\/[^/]+/);
    const currentRoute = match?.[0] ?? '';
    const routerUrl = `${currentRoute}/${baseUrl}`;

    try {
      const res = await fetch(apiUrl, {
        method,
      });

      if (method === TRequestMethod.HEAD) {
        setResponse({
          ok: true,
          data: null,
          status: 200,
          statusText: 'OK',
          headers: Object.fromEntries(res.headers.entries()),
        });

        return;
      }

      const data = await res.json();
      if (data !== null) {
        setResponse(data as IResponse);
      }
    } catch (error) {
      setResponse({
        ok: false,
        data: null,
        status: 500,
        statusText: (error as Error).message,
        headers: {},
      });
    } finally {
      window.history.replaceState(null, '', routerUrl);
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
      <hr className={style.hr} />
      {response?.status != null && <Response response={response} method={method} />}
    </div>
  );
}
