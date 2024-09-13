import imageAlexander from '@/assets/images/team/Aleksandr.png';
import imageEkaterina from '@/assets/images/team/Ekaterina.png';
import imageMikalai from '@/assets/images/team/Mikalai.png';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import style from './About.module.scss';

export const dynamic = 'force-dynamic';

function About(): JSX.Element {
  const t = useTranslations('About');

  const TEAM = [
    {
      name: `${t('aleksandr')}`,
      teamLead: true,
      frontDev: true,
      image: imageAlexander,
    },
    {
      name: `${t('mikalai')}`,
      teamLead: false,
      frontDev: true,
      image: imageMikalai,
    },
    {
      name: `${t('ekaterina')}`,
      teamLead: false,
      frontDev: true,
      image: imageEkaterina,
    },
  ];
  return (
    <section className={style.wrapper}>
      <h2 className={style.title}>{t('title')}</h2>
      <p className={style.description} lang='en-US'>
        {t('description')}
      </p>
      <div className={style.cards}>
        {TEAM.map(({ name, teamLead, frontDev, image }) => (
          <div className={style.card} key={name}>
            <Image src={image} width={300} height={300} alt={name} priority className={style.photo} />
            <span className={style.name}>{name}</span>
            <div className={style.roles}>
              {teamLead && <span className={style.role}>{t('teamLead')}</span>}
              {frontDev && <span className={style.role}>{t('developer')}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
