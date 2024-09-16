import rssLogo from '@/assets/images/rss-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import style from './Footer.module.scss';

export const dynamic = 'force-dynamic';

function Footer(): JSX.Element {
  return (
    <footer className={style.footer}>
      <div className={style.developers}>
        <Link href='https://github.com/Wood85' target='_blank' className={style.developer}>
          Wood85
        </Link>
        <Link href='https://github.com/doosterhere' target='_blank' className={style.developer}>
          doosterhere
        </Link>
        <Link href='https://github.com/kagerka' target='_blank' className={style.developer}>
          kagerka
        </Link>
      </div>

      <div className={style.year}>2024</div>

      <Link href='https://rs.school/courses/reactjs' target='_blank' className={style.rss_link} data-testid='linkToRSS'>
        <Image
          src={rssLogo}
          className={style.rss_logo}
          alt='RSSchool'
          width={20}
          height={20}
          data-testid='RSSLogo'
          priority
        />
      </Link>
    </footer>
  );
}
export default Footer;
