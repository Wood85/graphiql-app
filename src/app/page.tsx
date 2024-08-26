import Link from 'next/link';
import Image from 'next/image';

import imageAlexander from '../assets/images/team/Aleksandr.png';
import imageMikalai from '../assets/images/team/Mikalai.png';
import imageEkaterina from '../assets/images/team/Ekaterina.png';

import style from './page.module.scss';

export default function Page(): JSX.Element {
  return (
    <main className={style.main}>
      <div className={style.container}>
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

        <section className={style.about}>
          <h2 className={style.title}>About us</h2>
          <p className={style.paragraph}>
            This application is a result of our work as a team while studying at RS School, React 2024 Q3 course. We
            created a light-weight versions of Postman and GrqphiQL, combined in one app.
          </p>
          <div className={style.cards}>
            <div className={style.card}>
              <Image src={imageAlexander} width={300} height={300} alt='Aleksandr photo' priority />
              <span className={style.name}>Aleksandr Krivoshein</span>
              <div className={style.roles}>
                <span className={style.role}>Team-lead</span>
                <span className={style.role}>Frontend developer</span>
              </div>
            </div>

            <div className={style.card}>
              <Image src={imageMikalai} width={300} height={300} alt='Mikalai photo' priority />
              <span className={style.name}>Mikalai Shcharbakou</span>
              <div className={style.roles}>
                <span className={style.role}>Frontend developer</span>
              </div>
            </div>

            <div className={style.card}>
              <Image src={imageEkaterina} width={300} height={300} alt='Ekaterina photo' priority />
              <span className={style.name}>Ekaterina Kotliarenko</span>
              <div className={style.roles}>
                <span className={style.role}>Frontend developer</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
