'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';
import { ClientTop } from '@/components/ClientTop/ClientTop';
import RestClient from '@/components/RESTAPIClient/RESTAPIClient';

import style from './page.module.scss';

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
