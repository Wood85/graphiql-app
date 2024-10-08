'use client';

import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import style from './Welcome.module.scss';

interface IWelcomeProps {
  userName: string | null;
  isAuth: boolean;
  isLoading: boolean;
}

export const dynamic = 'force-dynamic';

function Welcome(props: IWelcomeProps): JSX.Element {
  const t = useTranslations('Welcome');
  const { userName, isAuth, isLoading } = props;

  return (
    <section className={style.wrapper}>
      {isLoading ? (
        <div className={style.mock_height}>
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className={style.title}>{isAuth ? `${t('title')}, ${userName}!` : `${t('title')}!`}</h2>
          <div className={style.actions}>
            {!isAuth && (
              <>
                <Button href='/sign-in' className={style.button}>
                  <SignInIcon className={style.sign_in_icon} />
                  {t('signIn')}
                </Button>
                <Button href='/sign-up' className={style.button}>
                  <SignUpIcon className={style.sign_up_icon} />
                  {t('signUp')}
                </Button>
              </>
            )}
            {isAuth && (
              <>
                <Link href='/restapi' className={style.link}>
                  {t('restClient')}
                </Link>
                <Link href='/graphiql' className={style.link}>
                  {t('graphiqlClient')}
                </Link>
                <Link href='/history' className={style.link}>
                  {t('history')}
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Welcome;
