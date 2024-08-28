'use client';

import BurgerMenuIcon from '@/assets/images/icons/BurgerMenuIcon';
import CloseIcon from '@/assets/images/icons/CloseIcon';
import HomeIcon from '@/assets/images/icons/HomeIcon';
import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import appLogo from '../../assets/images/app-logo.svg';
import Button from '../UI/Button/Button';
import style from './Header.module.scss';

function Header(): JSX.Element {
  const headerElement = useRef<HTMLElement | null>(null);
  const enLang = useRef<HTMLButtonElement | null>(null);
  const ruLang = useRef<HTMLButtonElement | null>(null);
  const burgerMenu = useRef<HTMLDivElement | null>(null);
  const burgerIcon = useRef<HTMLDivElement | null>(null);
  const closeIcon = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = (e: Event): void => {
    const scrollTop = window.scrollY;
    headerElement.current?.scrollIntoView({ behavior: 'smooth' });
    const INITIAL_POSITION = 1;
    scrollTop > INITIAL_POSITION
      ? headerElement.current?.classList.add(style.sticked)
      : headerElement.current?.classList.remove(style.sticked);
  };

  const getLang = (): void => {
    enLang.current?.classList.toggle(style.active);
    ruLang.current?.classList.toggle(style.active);
  };

  const openMenu = (): void => {
    burgerMenu.current?.classList.toggle(style.active);
    burgerIcon.current?.classList.toggle(style.active);
    closeIcon.current?.classList.toggle(style.active);
  };

  return (
    <>
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
            <Button href='/sign-in' className={style.signin_button}>
              <SignInIcon className={style.signin_icon} /> Sign In
            </Button>
            <Button href='/sign-up' className={style.signup_button}>
              <SignUpIcon className={style.signup_icon} /> Sign Up
            </Button>
          </div>
        </div>
        <button type='button' onClick={openMenu} className={style.mobile_menu}>
          <div ref={burgerIcon} className={`${style.burger_icon} ${style.active}`}>
            <BurgerMenuIcon /> Menu
          </div>
          <div ref={closeIcon} className={style.close_icon}>
            <CloseIcon /> Close
          </div>
        </button>
      </header>
      <div ref={burgerMenu} className={style.burger_menu}>
        <div className={style.burger_wrapper}>
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
            <Button href='/sign-in' className={style.signin_button} onClick={openMenu}>
              <SignInIcon className={style.signin_icon} /> Sign In
            </Button>
            <Button href='/sign-up' className={style.signup_button} onClick={openMenu}>
              <SignUpIcon className={style.signup_icon} /> Sign Up
            </Button>
          </div>
          <nav>
            <Link href='/' className={style.nav_mobile} onClick={openMenu}>
              <HomeIcon className={style.home_icon} /> Home
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Header;
