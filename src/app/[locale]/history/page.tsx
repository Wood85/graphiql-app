'use client';

import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';
import { Link } from '@/i18n/routing';
import { type IRequestLS } from '@/interfaces/LocalStorage';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

function History(): JSX.Element {
  const t = useTranslations('History');

  const [restfulRequest, setRestfulRequest] = useState<IRequestLS[] | ''>('');

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('RESTFUL_request') ?? '') as IRequestLS[];
    setRestfulRequest(value);
  }, []);

  return (
    <ProtectedRouteWrapper>
      <div className={style.wrapper}>
        <section className={style.content}>
          <h2 className={style.title}>{t('title')}</h2>
          <div className={style.info}>
            {restfulRequest !== '' && (
              <div className={style.history_links}>
                {restfulRequest.map((el) => (
                  <div key={el.time} className={style.history_request}>
                    <div className={style.method}>{el.method}</div>
                    <Link href={`/${el.client}?history=${el.time}`} className={style.link}>
                      {el.url}
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {restfulRequest === '' && (
              <div className={style.empty_history}>
                <p className={style.description}>You haven’t executed any requests. It’s empty here. Try:</p>
                <div>
                  <Link href='/restapi' className={style.link}>
                    REST Client
                  </Link>
                  <Link href='/graphiql' className={style.link}>
                    GraphiQL Client
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </ProtectedRouteWrapper>
  );
}

export default History;
