'use client';

import RestClient from '@/app/[locale]/components/RESTAPIClient/RESTAPIClient';
import { store } from '@/store/store';
import { useTranslations } from 'next-intl';
import { Provider } from 'react-redux';
import { ClientTop } from '../components/ClientTop/ClientTop';
import { ProtectedRouteWrapper } from '../components/ProtectedRouteWrapper';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

export default function Restapi(): JSX.Element {
  const t = useTranslations('Restapi');

  return (
    <Provider store={store}>
      <ProtectedRouteWrapper>
        <div className={style.client}>
          <div className={style.container}>
            <ClientTop title={t('title')} />
            <RestClient />
          </div>
        </div>
      </ProtectedRouteWrapper>
    </Provider>
  );
}
