'use client';

import HomeIcon from '@/assets/images/icons/HomeIcon';
import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import appLogo from '../../assets/images/app-logo.svg';
import style from './Header.module.scss';

function Header(): JSX.Element {
  const headerElement = useRef<HTMLElement | null>(null);
  const enLang = useRef<HTMLButtonElement | null>(null);
  const ruLang = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = (e: Event): void => {
    const scrollTop = window.scrollY;
    headerElement.current?.scrollIntoView({ behavior: 'smooth' });
    const INITIAL_POSITION = 0;
    scrollTop > INITIAL_POSITION
      ? headerElement.current?.classList.add(style.sticked)
      : headerElement.current?.classList.remove(style.sticked);
  };

  const getLang = (): void => {
    enLang.current?.classList.toggle(style.active);
    ruLang.current?.classList.toggle(style.active);
  };

  return (
    <header className={style.header} ref={headerElement}>
      <Link href='/' className={style.app_link}>
        <Image src={appLogo} className={style.app_logo} width={70} height={70} alt='App logo' priority />
      </Link>
      <nav>
        <Link href='/' className={style.nav_link}>
          <HomeIcon className={style.home_icon} /> Home
        </Link>
      </nav>
      <div className={style.options_wrapper}>
        <div className={style.lang_wrapper}>
          <button type='button' className={`${style.lang} ${style.active}`} ref={enLang} onClick={getLang}>
            En
          </button>
          <div className={style.lang_line} />
          <button type='button' className={style.lang} ref={ruLang} onClick={getLang}>
            Ru
          </button>
        </div>
        <div className={style.auth_wrapper}>
          <Link href='/sign-in' className={style.signin_button}>
            <SignInIcon className={style.signin_icon} /> Sign In
          </Link>
          <Link href='/sign-up' className={style.signup_button}>
            <SignUpIcon className={style.signup_icon} /> Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;

