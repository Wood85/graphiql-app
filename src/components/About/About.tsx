import Image from 'next/image';

import imageAlexander from '@/assets/images/team/Aleksandr.png';
import imageMikalai from '@/assets/images/team/Mikalai.png';
import imageEkaterina from '@/assets/images/team/Ekaterina.png';

import style from './About.module.scss';

const TEAM = [
  {
    name: 'Aleksandr Krivoshein',
    teamLead: true,
    frontDev: true,
    image: imageAlexander,
  },
  {
    name: 'Mikalai Shcharbakou',
    teamLead: false,
    frontDev: true,
    image: imageMikalai,
  },
  {
    name: 'Ekaterina Kotliarenko',
    teamLead: false,
    frontDev: true,
    image: imageEkaterina,
  },
];

function About(): JSX.Element {
  return (
    <section className={style.about}>
      <h2 className={style.title}>About us</h2>
      <p className={style.paragraph}>
        This application is a result of our work as a team while studying at RS School, React 2024 Q3 course. We created
        a light-weight versions of Postman and GrqphiQL, combined in one app.
      </p>
      <div className={style.cards}>
        {TEAM.map(({ name, teamLead, frontDev, image }) => (
          <div className={style.card} key={name}>
            <Image src={image} width={300} height={300} alt={name} priority />
            <span className={style.name}>{name}</span>
            <div className={style.roles}>
              {teamLead && <span className={style.role}>Team-lead</span>}
              {frontDev && <span className={style.role}>Frontend developer</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
