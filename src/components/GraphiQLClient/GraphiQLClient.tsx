'use client';

import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { useCallback, useEffect, useState } from 'react';
import { Response } from '../Response/Response';
import { Docs } from './Docs/Docs';
import style from './GraphiQLClient.module.scss';
import { QueryEditor } from './QueryEditor/QueryEditor';
import { RequestControl } from './RequestControl/RequestControl';
import { TableEditor } from './TableEditor/TableEditor';
import { VariablesEditor } from './VariablesEditor/VariablesEditor';

interface IProps {
  graphqlDocsIsOpen?: boolean;
}

export default function GraphiQLClient({ graphqlDocsIsOpen }: IProps): JSX.Element {
  const [method] = useState<TRequestMethod>(TRequestMethod.POST);
  const [url, setUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [query, setQuery] = useState(JSON.stringify({}));
  const [variables, setVariables] = useState(JSON.stringify({}));
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');

  const replaceURL = useCallback(async (): Promise<string> => {
    const urlEncoded = btoa(url).replace(/\//g, '+');

    const bodyEncoded = isBodyApplicable(method) ? btoa(query.replace(/'+/g, '"')) : '';

    const queryParams =
      headerKey !== ''
        ? new URLSearchParams({
            [headerKey]: headerValue,
          }).toString()
        : '';

    const baseUrl = `GRAPHQL/${urlEncoded}${isBodyApplicable(method) ? `/${bodyEncoded}` : ''}${headerKey !== '' ? `?${queryParams}` : ''}`;

    const match = window.location.pathname.match(/^\/[^/]+/);
    const currentRoute = match?.[0] ?? '';
    const routerUrl = `${currentRoute}/${baseUrl}`;

    window.history.replaceState(null, '', routerUrl);
    return baseUrl;
  }, [query, headerKey, headerValue, method, url]);

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

    //  The replacement below is necessary because the atob method uses the '/' character when
    //  encoding the string. This address string is misinterpreted during routing, so we use
    //  the '+' character instead and reverse the substitution on the server side before encoding.
    const baseUrl = await replaceURL();
    const { origin } = window.location;
    const apiUrl = `${origin}/api/${baseUrl}`;

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
    }
  };

  const isBodyApplicable = (requestMethod: TRequestMethod): boolean => requestMethod === TRequestMethod.POST;
  console.log(graphqlDocsIsOpen);

  return (
    <div className={style.wrapper}>
      {graphqlDocsIsOpen === true ? <Docs /> : null}

      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <RequestControl url={url} setUrl={setUrl} sdlUrl={sdlUrl} setSdlUrl={setSdlUrl} />
          <TableEditor
            headerKey={headerKey}
            setHeaderKey={setHeaderKey}
            headerValue={headerValue}
            setHeaderValue={setHeaderValue}
          />
          <QueryEditor query={query} setQuery={setQuery} />
          <VariablesEditor variables={variables} setVariables={setVariables} />
        </form>
        {response?.status != null && <Response response={response} />}
      </div>
    </div>
  );
}
