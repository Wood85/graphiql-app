'use client';

import SelectArrowBottomIcon from '@/assets/images/icons/SelectArrowBottomIcon';
import SelectArrowTopIcon from '@/assets/images/icons/SelectArrowTopIcon';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Response } from '../Response/Response';
import Button from '../UI/Button/Button';
import { Docs } from './Docs/Docs';
import style from './GraphiQLClient.module.scss';
import { HeadersEditor } from './HeadersEditor/HeadersEditor';
import { QueryEditor } from './QueryEditor/QueryEditor';
import { RequestControl } from './RequestControl/RequestControl';
import { VariablesEditor } from './VariablesEditor/VariablesEditor';

interface IProps {
  graphqlDocsIsOpen?: boolean;
}

enum TTabs {
  HEADERS = 'HEADERS',
  VARIABLES = 'VARIABLES',
}

export default function GraphiQLClient({ graphqlDocsIsOpen }: IProps): JSX.Element {
  const [method] = useState<TRequestMethod>(TRequestMethod.POST);
  const [url, setUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [response, setResponse] = useState<IResponse | null>(null);
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState(JSON.stringify({}));
  const [headerKey, setHeaderKey] = useState('Content-type');
  const [headerValue, setHeaderValue] = useState('application/json');
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.VARIABLES);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

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
    // const baseUrl = await replaceURL();
    // const { origin } = window.location;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
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

  return (
    <div className={style.wrapper}>
      {graphqlDocsIsOpen === true ? <Docs /> : null}

      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <RequestControl url={url} setUrl={setUrl} sdlUrl={sdlUrl} setSdlUrl={setSdlUrl} />
          <QueryEditor query={query} setQuery={setQuery} />
          <div className={style.options}>
            <div className={style.tabs_line}>
              <div className={style.tabs}>
                <Button
                  className={clsx(style.button, activeTab === TTabs.VARIABLES ? style.active : '')}
                  onClick={() => {
                    setActiveTab(TTabs.VARIABLES);
                  }}
                >
                  Variables
                </Button>
                <Button
                  className={clsx(style.button, activeTab === TTabs.HEADERS ? style.active : '')}
                  onClick={() => {
                    setActiveTab(TTabs.HEADERS);
                  }}
                >
                  Headers
                </Button>
              </div>
            </div>
            {isOptionsOpen && (
              <div>
                {activeTab === TTabs.VARIABLES && <VariablesEditor variables={variables} setVariables={setVariables} />}
                {activeTab === TTabs.HEADERS && (
                  <HeadersEditor
                    headerKey={headerKey}
                    setHeaderKey={setHeaderKey}
                    headerValue={headerValue}
                    setHeaderValue={setHeaderValue}
                  />
                )}
              </div>
            )}
            {!isOptionsOpen && <div className={style.options_closed} />}

            <div className={style.buttons}>
              <Button
                className={style.select_arrow_icon}
                onClick={() => {
                  setIsOptionsOpen(!isOptionsOpen);
                }}
              >
                {isOptionsOpen && <SelectArrowTopIcon />}
                {!isOptionsOpen && <SelectArrowBottomIcon />}
              </Button>
            </div>
          </div>
        </form>
        {response?.status != null && <Response method={method} response={response} />}
      </div>
    </div>
  );
}
