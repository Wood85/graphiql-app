'use client';

import { ClientTop } from '@/components/ClientTop/ClientTop';
import GraphiQLClient from '@/components/GraphiQLClient/GraphiQLClient';
import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';
import { store } from '@/store/store';
import { useState } from 'react';
import { Provider } from 'react-redux';
import style from './page.module.scss';

export default function Graphiql(): JSX.Element {
  const [graphqlDocsIsOpen, setGraphqlDocsIsOpen] = useState(false);

  return (
    <Provider store={store}>
      <ProtectedRouteWrapper>
        <div className={style.client}>
          <div className={style.container}>
            <ClientTop
              title='GraphiQL Client'
              setGraphqlDocsIsOpen={setGraphqlDocsIsOpen}
              graphqlDocsIsOpen={graphqlDocsIsOpen}
            />
            <GraphiQLClient graphqlDocsIsOpen={graphqlDocsIsOpen} />
          </div>
        </div>
      </ProtectedRouteWrapper>
    </Provider>
  );
}
