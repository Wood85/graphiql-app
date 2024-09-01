'use client';

import Link from 'next/link';

import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

import style from './Welcome.module.scss';

interface IWelcomeProps {
  userName: string | null;
  isAuth: boolean;
  isLoading: boolean;
}

function Welcome(props: IWelcomeProps): JSX.Element {
  const { userName, isAuth, isLoading } = props;

  return (
    <section className={style.wrapper}>
      {isLoading ? (
        <div className={style.mock_height}>
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className={style.title}>{isAuth ? `Welcome back, ${userName}!` : 'Welcome!'}</h2>
          <div className={style.actions}>
            {!isAuth && (
              <>
                <Button href='/sign-in' className={style.button}>
                  <SignInIcon className={style.sign_in_icon} />
                  Sign In
                </Button>
                <Button href='/sign-up' className={style.button}>
                  <SignUpIcon className={style.sign_up_icon} />
                  Sign Up
                </Button>
              </>
            )}
            {isAuth && (
              <>
                <Link href='/restapi' className={style.link}>
                  REST Client
                </Link>
                <Link href='/graphiql' className={style.link}>
                  GraphiQL Client
                </Link>
                <Link href='/history' className={style.link}>
                  History
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
