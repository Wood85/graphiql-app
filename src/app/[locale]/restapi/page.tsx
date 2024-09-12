'use client';

import { ClientTop } from '@/components/ClientTop/ClientTop';
import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';
import RestClient from '@/components/RESTAPIClient/RESTAPIClient';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

export default function Restapi(): JSX.Element {
  return (
    <Provider store={store}>
      <ProtectedRouteWrapper>
        <div className={style.client}>
          <div className={style.container}>
            <ClientTop title='RESTful Client' />
            <RestClient />
          </div>
        </div>
      </ProtectedRouteWrapper>
    </Provider>
  );
}
