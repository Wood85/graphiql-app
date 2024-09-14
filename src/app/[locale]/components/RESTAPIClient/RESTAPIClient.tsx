'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { type IHeadersVariables, type IRequestLS } from '@/interfaces/LocalStorage';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import { headers, variables } from '@/store/reducers/restFullSlice';
import { EMPTY_ARR_LENGTH, STEP_SIZE } from '@/utils/constants';
import substitution from '@/utils/variableSubstitution';
import { useCallback, useEffect, useState } from 'react';
import { Response } from '../../../../components/Response/Response';
import { loadingFinished, loadingStarted } from '../../../../store/reducers/loadingStateSlice';
import { BodyEditor } from './BodyEditor/BodyEditor';
import { RequestControl } from './RequestControl/RequestControl';
import style from './RESTAPIClient.module.scss';

export const dynamic = 'force-dynamic';

export default function RESTAPIClient(): JSX.Element {
  const headersSelector = useAppSelector((state) => state.rest.headers);
  const variablesSelector = useAppSelector((state) => state.rest.variables);
  const [method, setMethod] = useState<TRequestMethod>(TRequestMethod.GET);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [body, setBody] = useState(JSON.stringify({}));
  const [variablesLS, setVariablesLS] = useState<IHeadersVariables[]>([]);
  const [headersLS, setHeadersLS] = useState<IHeadersVariables[]>([]);

  const dispatcher = useAppDispatch();

  const replaceURL = useCallback(async (): Promise<string> => {
    const urlWithoutVariables = substitution(url, variablesSelector);
    const urlEncoded = btoa(urlWithoutVariables).replace(/\//g, '+');

    //  The replacement below is necessary because the atob method uses the '/' character when
    //  encoding the string. This address string is misinterpreted during routing, so we use
    //  the '+' character instead and reverse the substitution on the server side before encoding.

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
    const currentRoute = match?.input ?? '';

    const routerUrl = `${currentRoute}/${baseUrl}`;

    window.history.replaceState(null, '', routerUrl);

    return baseUrl;
  }, [body, method, url, headersSelector, variablesSelector]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const baseUrl = await replaceURL();
    const { origin } = window.location;
    console.log(origin);
    const match = window.location.pathname.match(/^\/[^/]+/);
    const currentRoute = match?.[0] ?? '';
    const apiUrl = `${origin}/${currentRoute}/api/${baseUrl}`;
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

  const isBodyApplicable = (requestMethod: TRequestMethod): boolean =>
    requestMethod === TRequestMethod.POST ||
    requestMethod === TRequestMethod.PUT ||
    requestMethod === TRequestMethod.PATCH;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const match = window.location.search.match(/\?history=[0-9]+/gm);
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
    dispatch(variables(currentData.variables));
    dispatch(headers(currentData.headers));
  }, [dispatch]);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <RequestControl method={method} setMethod={setMethod} url={url} setUrl={setUrl} />
        <BodyEditor body={body} setBody={setBody} />
      </form>
      {response?.status != null && <Response response={response} method={method} />}
    </div>
  );
}
