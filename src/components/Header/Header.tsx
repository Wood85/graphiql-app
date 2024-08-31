'use client';

import appLogo from '@/assets/images/app-logo.svg';
import BurgerMenuIcon from '@/assets/images/icons/BurgerMenuIcon';
import CloseIcon from '@/assets/images/icons/CloseIcon';
import HomeIcon from '@/assets/images/icons/HomeIcon';
import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import Button from '@/components/UI/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import style from './Header.module.scss';

interface IProps {
  lang: string;
}

function Header(lang: IProps): JSX.Element {
  const headerElement = useRef<HTMLElement | null>(null);
  const enLang = useRef<HTMLButtonElement | null>(null);
  const ruLang = useRef<HTMLButtonElement | null>(null);
  const enLangMobile = useRef<HTMLButtonElement | null>(null);
  const ruLangMobile = useRef<HTMLButtonElement | null>(null);
  const burgerMenu = useRef<HTMLDivElement | null>(null);
  const burgerIcon = useRef<HTMLDivElement | null>(null);
  const closeIcon = useRef<HTMLDivElement | null>(null);
  const language = lang;

  const applyLangStyles = (): void => {
    if (language.lang === 'en') {
      enLang.current?.classList.add(style.active);
      ruLang.current?.classList.remove(style.active);
      enLangMobile.current?.classList.add(style.active);
      ruLangMobile.current?.classList.remove(style.active);
    }
    if (language.lang === 'ru') {
      ruLang.current?.classList.add(style.active);
      enLang.current?.classList.remove(style.active);
      ruLangMobile.current?.classList.add(style.active);
      enLangMobile.current?.classList.remove(style.active);
    }
  };

  useEffect(() => {
    applyLangStyles();

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  const isSticky = (e: Event): void => {
    const scrollTop = window.scrollY;
    headerElement.current?.scrollIntoView({ behavior: 'smooth' });
    const INITIAL_POSITION = 1;
    scrollTop > INITIAL_POSITION
      ? headerElement.current?.classList.add(style.sticked)
      : headerElement.current?.classList.remove(style.sticked);
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
            <button type='button' className={`${style.lang}`} ref={enLang}>
              <Link href='/en' className={style.lang_link}>
                En
              </Link>
            </button>
            <div className={style.lang_line} />
            <button type='button' className={style.lang} ref={ruLang}>
              <Link href='/ru' className={style.lang_link}>
                Ru
              </Link>
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
            <button type='button' className={`${style.lang}`} ref={enLangMobile}>
              <Link href='/en' className={style.lang_link}>
                En
              </Link>
            </button>
            <div className={style.lang_line} />
            <button type='button' className={style.lang} ref={ruLangMobile}>
              <Link href='/ru' className={style.lang_link}>
                Ru
              </Link>
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
