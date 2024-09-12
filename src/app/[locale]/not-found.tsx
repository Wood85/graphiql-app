import Image from 'next/image';
import Link from 'next/link';

import notFoundImage from '../../assets/images/not-found.svg';
import style from './not-found.module.scss';

export const dynamic = 'force-dynamic';

export default function NotFoundPage(): JSX.Element {
  return (
    <section className={style.wrapper}>
      <Image src={notFoundImage} className={style.image} width={500} height={516} priority alt='Not found' />
      <div className={style.caption}>
        Page not found. You can go to the{' '}
        <Link href='/' className={style.link}>
          Main&nbsp;page
        </Link>
      </div>
    </section>
  );
}
