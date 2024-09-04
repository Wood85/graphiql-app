'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ClientTop } from '@/components/ClientTop/ClientTop';
import RestClient from '@/components/RESTAPIClient/RESTAPIClient';

import style from './page.module.scss';

export default function Restapi(): JSX.Element {
  return (
    <Provider store={store}>
      <div className={style.client}>
        <div className={style.container}>
          <ClientTop title='RESTful Client' />
          <RestClient />
        </div>
      </div>
    </Provider>
  );
}
