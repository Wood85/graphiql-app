import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import notFoundImage from '../../assets/images/not-found.svg';
import style from './not-found.module.scss';

export const dynamic = 'force-dynamic';

export default function NotFoundPage(): JSX.Element {
  const t = useTranslations('NotFound');

  return (
    <section className={style.wrapper}>
      <Image src={notFoundImage} className={style.image} width={500} height={516} priority alt='Not found' />
      <div className={style.caption}>
        {t('notFound')}{' '}
        <Link href='/' className={style.link}>
          {t('mainPage')}
        </Link>
      </div>
    </section>
  );
}
