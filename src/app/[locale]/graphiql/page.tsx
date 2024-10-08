'use client';

import { store } from '@/store/store';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { ClientTop } from '../components/ClientTop/ClientTop';
import GraphiQLClient from '../components/GraphiQLClient/GraphiQLClient';
import { ProtectedRouteWrapper } from '../components/ProtectedRouteWrapper';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

export default function Graphiql(): JSX.Element {
  const t = useTranslations('Graphiql');

  const [graphqlDocsIsOpen, setGraphqlDocsIsOpen] = useState(false);
  const [isDocsAvailable, setIsDocsAvailable] = useState(false);

  return (
    <Provider store={store}>
      <ProtectedRouteWrapper>
        <div className={style.client}>
          <div className={style.container}>
            <ClientTop
              title={t('title')}
              setGraphqlDocsIsOpen={setGraphqlDocsIsOpen}
              graphqlDocsIsOpen={graphqlDocsIsOpen}
              isDocsAvailable={isDocsAvailable}
            />
            <GraphiQLClient graphqlDocsIsOpen={graphqlDocsIsOpen} setIsDocsAvailable={setIsDocsAvailable} />
          </div>
        </div>
      </ProtectedRouteWrapper>
    </Provider>
  );
}
