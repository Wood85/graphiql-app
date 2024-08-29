'use client';

import Link from 'next/link';
import { useState } from 'react';

import clsx from 'clsx';

import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import Button from '../UI/Button/Button';

import style from './Welcome.module.scss';

function Welcome(): JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  const USERNAME = 'User';

  const toggelAuth = (): void => {
    setIsAuth(!isAuth);
  };

  return (
    <section className={style.wrapper}>
      <Button onClick={toggelAuth} className={clsx(style.button, style.absolute)}>
        Temporary auth toggler
      </Button>
      <h2 className={style.title}>{isAuth ? `Welcome back, ${USERNAME}!` : 'Welcome!'}</h2>
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
    </section>
  );
}

export default Welcome;
