import Image from 'next/image';
import Link from 'next/link';
import rssLogo from '../../assets/images/rss-logo.svg';
import style from './Footer.module.scss';

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
      <div>2024</div>
      <Link href='https://rs.school/courses/reactjs' target='_blank'>
        <Image src={rssLogo} width={64} height={64} alt='RSSchool' priority />
      </Link>
    </footer>
  );
}
export default Footer;

