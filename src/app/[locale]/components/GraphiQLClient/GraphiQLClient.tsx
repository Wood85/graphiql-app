'use client';

import SelectArrowBottomIcon from '@/assets/images/icons/SelectArrowBottomIcon';
import SelectArrowTopIcon from '@/assets/images/icons/SelectArrowTopIcon';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useHeaders from '@/hooks/useHeaders';
import { type IRequestLS } from '@/interfaces/LocalStorage';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '@/interfaces/Response';
import {
  gqlHeaders,
  selectGraphQLHeaders,
  selectGraphQLVariables,
  setGraphQLVariables,
  type TGraphQLVars,
} from '@/store/reducers/graphqlSlice';
import { loadingFinished, loadingStarted } from '@/store/reducers/loadingStateSlice';
import { GRAPHQL } from '@/utils/constants';
import { replaceInHistory } from '@/utils/replaceHistory';
import clsx from 'clsx';
import { type IntrospectionQuery } from 'graphql';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Response } from '../Response/Response';
import Button from '../UI/Button/Button';
import { Docs } from './Docs/Docs';
import style from './GraphiQLClient.module.scss';
import { HeadersEditor } from './HeadersEditor/HeadersEditor';
import { QueryEditor } from './QueryEditor/QueryEditor';
import { RequestControl } from './RequestControl/RequestControl';
import { VariablesEditor } from './VariablesEditor/VariablesEditor';

export const dynamic = 'force-dynamic';

interface IProps {
  graphqlDocsIsOpen?: boolean;
  setIsDocsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

enum TTabs {
  HEADERS = 'HEADERS',
  VARIABLES = 'VARIABLES',
}

export default function GraphiQLClient({ graphqlDocsIsOpen, setIsDocsAvailable }: IProps): JSX.Element {
  const t = useTranslations('Graphiql');
  const [url, setUrl] = useState('');
  const [sdlUrl, setSdlUrl] = useState('');
  const [queryFromLS, setQueryFromLS] = useState('#Query Editor');
  const [docs, setDocs] = useState<IntrospectionQuery | null>(null);
  const [response, setResponse] = useState<IResponse | null>(null);
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.VARIABLES);
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);

  const dispatcher = useAppDispatch();
  const headers = useHeaders('graphql');
  const variablesSelector = useAppSelector(selectGraphQLVariables);
  const graphqlHeadersSelector = useAppSelector(selectGraphQLHeaders);

  useEffect(() => {
    replaceInHistory('method', GRAPHQL);
  }, []);

  useEffect(() => {
    replaceInHistory('headers', headers);
  }, [headers]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    replaceInHistory('url', url);
    const { href } = window.location;
    const apiUrl = href.replace(/\/restapi\/|\/graphiql\//g, '/api/');
    dispatcher(loadingStarted());

    try {
      const res = await fetch(apiUrl, {
        method: TRequestMethod.POST,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
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
    } finally {
      dispatcher(loadingFinished());
    }

    const allRequests = [];
    if (localStorage.getItem('history_requests') !== null) {
      JSON.parse(localStorage.getItem('history_requests') ?? '').forEach((el: IRequestLS) => allRequests.push(el));
    }
    const currentTime = new Date().getTime();
    const currentData = {
      client: 'graphiql',
      time: currentTime,
      method: GRAPHQL,
      url,
      sdlUrl,
      headers: graphqlHeadersSelector,
      body: queryFromLS,
      variables: variablesSelector,
    };
    allRequests.push(currentData);

    localStorage.setItem('history_requests', JSON.stringify(allRequests));
  };

  useEffect(() => {
    if (localStorage.getItem('current_request') !== null) {
      const currentData = JSON.parse(localStorage.getItem('current_request') ?? '') as IRequestLS;

      setUrl(currentData.url ?? '');
      setSdlUrl(currentData.sdlUrl ?? '');
      setQueryFromLS(currentData.body);
      dispatcher(gqlHeaders(currentData.headers ?? []));
      dispatcher(setGraphQLVariables(currentData.variables as TGraphQLVars));
      localStorage.removeItem('current_request');
    }
  }, [dispatcher]);

  return (
    <div className={style.wrapper}>
      <div className={`${style.container} ${graphqlDocsIsOpen === true ? style.docsOpen : ''}`}>
        <div className={style.docs_wrapper}>{graphqlDocsIsOpen === true ? <Docs schema={docs} /> : null}</div>
        <div className={style.form_wrapper}>
          <form className={style.form} onSubmit={handleSubmit} data-testid='formElement'>
            <RequestControl
              url={url}
              setUrl={setUrl}
              sdlUrl={sdlUrl}
              setSdlUrl={setSdlUrl}
              setDocs={setDocs}
              setIsDocsAvailable={setIsDocsAvailable}
            />
            <QueryEditor setQueryFromLS={setQueryFromLS} queryFromLS={queryFromLS} />
            <div className={style.options}>
              <div className={style.tabs_line}>
                <div className={style.tabs}>
                  <Button
                    className={clsx(style.button, activeTab === TTabs.VARIABLES ? style.active : '')}
                    onClick={() => {
                      setActiveTab(TTabs.VARIABLES);
                    }}
                  >
                    {t('variables')}
                  </Button>
                  <Button
                    className={clsx(style.button, activeTab === TTabs.HEADERS ? style.active : '')}
                    onClick={() => {
                      setActiveTab(TTabs.HEADERS);
                    }}
                  >
                    {t('headers')}
                  </Button>
                </div>
              </div>
              {isOptionsOpen && (
                <div className={style.options_content}>
                  {activeTab === TTabs.VARIABLES && <VariablesEditor />}
                  {activeTab === TTabs.HEADERS && <HeadersEditor />}
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
          {response?.status != null && <Response response={response} method={TRequestMethod.POST} />}
        </div>
      </div>
    </div>
  );
}
