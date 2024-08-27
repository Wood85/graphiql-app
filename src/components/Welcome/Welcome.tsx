import Link from 'next/link';

import style from './Welcome.module.scss';

function Welcome(): JSX.Element {
  return (
    <section className={style.welcome}>
      <h2 className={style.title}>Welcome!</h2>
      <div className={style.buttons}>
        <Link href='/sign-in' className={style.button}>
          Sign In
        </Link>
        <Link href='/sign-up' className={style.button}>
          Sign Up
        </Link>
      </div>
    </section>
  );
}

export default Welcome;
