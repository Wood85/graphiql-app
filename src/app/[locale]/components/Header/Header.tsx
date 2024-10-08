'use client';

import appLogo from '@/assets/images/app-logo.svg';
import BurgerMenuIcon from '@/assets/images/icons/BurgerMenuIcon';
import CloseIcon from '@/assets/images/icons/CloseIcon';
import HomeIcon from '@/assets/images/icons/HomeIcon';
import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignOutIcon from '@/assets/images/icons/SignOutIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import { auth, logout } from '@/firebase/firebase';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useTransition } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '../UI/Button/Button';
import style from './Header.module.scss';

export const dynamic = 'force-dynamic';

function Header(): JSX.Element {
  const t = useTranslations('Header');

  const [user] = useAuthState(auth);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const headerElement = useRef<HTMLElement | null>(null);
  const enLang = useRef<HTMLButtonElement | null>(null);
  const ruLang = useRef<HTMLButtonElement | null>(null);
  const enLangMobile = useRef<HTMLButtonElement | null>(null);
  const ruLangMobile = useRef<HTMLButtonElement | null>(null);
  const burgerMenu = useRef<HTMLDivElement | null>(null);
  const burgerIcon = useRef<HTMLDivElement | null>(null);
  const closeIcon = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const applyLangStyles = (): void => {
      if (localActive === 'en') {
        enLang.current?.classList.add(style.active);
        ruLang.current?.classList.remove(style.active);
        enLangMobile.current?.classList.add(style.active);
        ruLangMobile.current?.classList.remove(style.active);
      }
      if (localActive === 'ru') {
        ruLang.current?.classList.add(style.active);
        enLang.current?.classList.remove(style.active);
        ruLangMobile.current?.classList.add(style.active);
        enLangMobile.current?.classList.remove(style.active);
      }
    };
    applyLangStyles();

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, [localActive]);

  const isSticky = (e: Event): void => {
    const scrollTop = window.scrollY;
    headerElement.current?.scrollIntoView({ behavior: 'smooth' });
    const INITIAL_POSITION = 1;
    scrollTop > INITIAL_POSITION
      ? headerElement.current?.classList.add(style.sticked)
      : headerElement.current?.classList.remove(style.sticked);
  };

  const getLang = (lang: string): void => {
    const path = window.location.pathname.replace(/^\/(ru|en)/, '');

    startTransition(() => {
      router.replace(`/${lang}${path}`);
    });
  };

  const openMenu = (): void => {
    burgerMenu.current?.classList.toggle(style.active);
    burgerIcon.current?.classList.toggle(style.active);
    closeIcon.current?.classList.toggle(style.active);
    document.body.classList.toggle(style.burger_active);
  };

  return (
    <>
      <header className={style.header} ref={headerElement} data-testid='header'>
        <Link href='/' className={style.app_link}>
          <Image src={appLogo} className={style.app_logo} width={70} height={70} alt='App logo' priority />
        </Link>
        <nav>
          <Link href='/' className={style.nav_link}>
            <HomeIcon className={style.home_icon} /> {t('home')}
          </Link>
        </nav>
        <div className={style.options_wrapper}>
          <div className={style.lang_wrapper}>
            <button
              type='button'
              className={style.lang}
              ref={enLang}
              onClick={() => {
                getLang('en');
              }}
            >
              {t('en')}
            </button>
            <div className={style.lang_line} />
            <button
              type='button'
              className={style.lang}
              ref={ruLang}
              onClick={() => {
                getLang('ru');
              }}
            >
              {t('ru')}
            </button>
          </div>
          <div className={style.auth_wrapper}>
            {user !== null && user !== undefined ? (
              <Button className={style.signout_button} onClick={logout}>
                <SignOutIcon className={style.signout_icon} /> {t('signOut')}
              </Button>
            ) : (
              <>
                <Button href='/sign-in' className={style.signin_button}>
                  <SignInIcon className={style.signin_icon} /> {t('signIn')}
                </Button>
                <Button href='/sign-up' className={style.signup_button}>
                  <SignUpIcon className={style.signup_icon} /> {t('signUp')}
                </Button>
              </>
            )}
          </div>
        </div>
        <button type='button' onClick={openMenu} className={style.mobile_menu} data-testid='mobileMenu'>
          <div ref={burgerIcon} className={`${style.burger_icon} ${style.active}`} data-testid='burgerIcon'>
            <BurgerMenuIcon /> Menu
          </div>
          <div ref={closeIcon} className={style.close_icon} data-testid='closeIcon'>
            <CloseIcon /> Close
          </div>
        </button>
      </header>
      <div ref={burgerMenu} className={style.burger_menu}>
        <div className={style.burger_wrapper}>
          <div className={style.lang_wrapper}>
            <button
              type='button'
              className={style.lang}
              ref={enLangMobile}
              onClick={() => {
                getLang('en');
              }}
            >
              {t('en')}
            </button>
            <div className={style.lang_line} />
            <button
              type='button'
              className={style.lang}
              ref={ruLangMobile}
              onClick={() => {
                getLang('ru');
              }}
            >
              {t('ru')}
            </button>
          </div>
          <div className={style.auth_wrapper}>
            {user !== null && user !== undefined ? (
              <Button
                className={style.signout_button}
                onClick={() => {
                  void logout();
                  openMenu();
                }}
              >
                <SignOutIcon className={style.signout_icon} /> {t('signOut')}
              </Button>
            ) : (
              <>
                <Button href='/sign-in' className={style.signin_button} onClick={openMenu}>
                  <SignInIcon className={style.signin_icon} /> {t('signIn')}
                </Button>
                <Button href='/sign-up' className={style.signup_button} onClick={openMenu}>
                  <SignUpIcon className={style.signup_icon} /> {t('signUp')}
                </Button>
              </>
            )}
          </div>
          <nav>
            <Link href='/' className={style.nav_mobile} onClick={openMenu}>
              <HomeIcon className={style.home_icon} /> {t('home')}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Header;
