'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';

import { TRequestMethod } from '@/interfaces/RequestMethod';
import { EMPTY_ARR_LENGTH, STEP_SIZE } from '@/utils/constants';
import type { IResponse } from '@/interfaces/Response';
import substitution from '@/utils/variableSubstitution';
import { Response } from '../Response/Response';
import { BodyEditor } from './BodyEditor/BodyEditor';
import { RequestControl } from './RequestControl/RequestControl';

import style from './RESTAPIClient.module.scss';

export default function RESTAPIClient(): JSX.Element {
  const headersSelector = useAppSelector((state) => state.rest.headers);
  const variablesSelector = useAppSelector((state) => state.rest.variables);
  const [method, setMethod] = useState<TRequestMethod>(TRequestMethod.GET);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState(JSON.stringify({}));

  const replaceURL = useCallback(async (): Promise<string> => {
    const urlWithoutVariables = substitution(url, variablesSelector);
    const urlEncoded = btoa(urlWithoutVariables).replace(/\//g, '+');

    const bodyWithoutVariables = substitution(body, variablesSelector);
    const bodyEncoded = isBodyApplicable(method) ? btoa(bodyWithoutVariables.replace(/'+/g, '"')) : '';

    const queryParamsArr = [];
    for (let i = 0; i < headersSelector.length; i += STEP_SIZE) {
      if (headersSelector[i].checked) {
        const keyWithoutVariables = substitution(headersSelector[i].key, variablesSelector);
        const valueWithoutVariables = substitution(headersSelector[i].value, variablesSelector);
        const param = new URLSearchParams({ [keyWithoutVariables]: valueWithoutVariables }).toString();
        queryParamsArr.push(param);
      }
    }

    const queryParams = queryParamsArr.length > EMPTY_ARR_LENGTH ? queryParamsArr.join('&') : '';

    const baseUrl = `${method}/${urlEncoded}${isBodyApplicable(method) ? `/${bodyEncoded}` : ''}${headersSelector.length > EMPTY_ARR_LENGTH ? `?${queryParams}` : ''}`;

    const match = window.location.pathname.match(/^\/[^/]+/);
    const currentRoute = match?.[0] ?? '';
    const routerUrl = `${currentRoute}/${baseUrl}`;

    window.history.replaceState(null, '', routerUrl);

    return baseUrl;
  }, [body, method, url, headersSelector, variablesSelector]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

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

  const isBodyApplicable = (requestMethod: TRequestMethod): boolean =>
    requestMethod === TRequestMethod.POST ||
    requestMethod === TRequestMethod.PUT ||
    requestMethod === TRequestMethod.PATCH;

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <RequestControl method={method} setMethod={setMethod} url={url} setUrl={setUrl} />
        <BodyEditor setBody={setBody} />
      </form>
      {response?.status != null && <Response response={response} method={method} />}
    </div>
  );
}
