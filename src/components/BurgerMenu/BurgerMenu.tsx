import HomeIcon from '@/assets/images/icons/HomeIcon';
import SignInIcon from '@/assets/images/icons/SignInIcon';
import SignUpIcon from '@/assets/images/icons/SignUpIcon';
import Link from 'next/link';
import { useRef } from 'react';
import Button from '../UI/Button/Button';
import style from './BurgerMenu.module.scss';

interface IProps {
  className?: string;
}
function BurgerMenu({ className }: IProps): JSX.Element {
  const enLang = useRef<HTMLButtonElement | null>(null);
  const ruLang = useRef<HTMLButtonElement | null>(null);

  const getLang = (): void => {
    enLang.current?.classList.toggle(style.active);
    ruLang.current?.classList.toggle(style.active);
  };

  return (
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
        <Button href='/sign-in' className={style.signin_button}>
          <SignInIcon className={style.signin_icon} /> Sign In
        </Button>
        <Button href='/sign-up' className={style.signup_button}>
          <SignUpIcon className={style.signup_icon} /> Sign Up
        </Button>
      </div>
      <nav>
        <Link href='/' className={style.nav_link}>
          <HomeIcon className={style.home_icon} /> Home
        </Link>
      </nav>
    </div>
  );
}
export default BurgerMenu;
