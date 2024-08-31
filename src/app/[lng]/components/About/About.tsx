import Image from 'next/image';

import imageAlexander from '@/assets/images/team/Aleksandr.png';
import imageEkaterina from '@/assets/images/team/Ekaterina.png';
import imageMikalai from '@/assets/images/team/Mikalai.png';

import style from './About.module.scss';

interface IProps {
  translate: {
    aboutTitle: string;
    aboutDescription: string;
    aboutTeam: {
      aleksandr: string;
      ekaterina: string;
      mikalai: string;
      role: {
        teamLead: string;
        developer: string;
      };
    };
  };
}

async function About({ translate }: IProps): Promise<JSX.Element> {
  const TEAM = [
    {
      name: translate.aboutTeam.aleksandr,
      teamLead: true,
      frontDev: true,
      image: imageAlexander,
    },
    {
      name: translate.aboutTeam.mikalai,
      teamLead: false,
      frontDev: true,
      image: imageMikalai,
    },
    {
      name: translate.aboutTeam.ekaterina,
      teamLead: false,
      frontDev: true,
      image: imageEkaterina,
    },
  ];

  return (
    <section className={style.wrapper}>
      <h2 className={style.title}>{translate.aboutTitle}</h2>
      <p className={style.description}>{translate.aboutDescription}</p>
      <div className={style.cards}>
        {TEAM.map(({ name, teamLead, frontDev, image }) => (
          <div className={style.card} key={name}>
            <Image src={image} width={300} height={300} alt={name} priority className={style.photo} />
            <span className={style.name}>{name}</span>
            <div className={style.roles}>
              {teamLead && <span className={style.role}>{translate.aboutTeam.role.teamLead}</span>}
              {frontDev && <span className={style.role}>{translate.aboutTeam.role.developer}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
