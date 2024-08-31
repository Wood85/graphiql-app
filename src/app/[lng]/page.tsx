import About from '@/app/[lng]/components/About/About';
import Welcome from '@/components/Welcome/Welcome';
import { useTranslation } from '../i18n';
import { fallbackLng, languages } from '../i18n/settings';
import style from './page.module.scss';

interface IProps {
  params: {
    lng: string;
  };
}

export default async function Page({ params: { lng } }: IProps): Promise<JSX.Element> {
  const { t } = await useTranslation(languages.includes(lng) ? lng : fallbackLng);
  const translate = {
    welcomeTitle: t('title'),
    signIn: t('signIn'),
    signUp: t('signUp'),
    aboutTitle: t('aboutTitle'),
    aboutDescription: t('aboutDescription'),
    aboutTeam: {
      aleksandr: t('aleksandr'),
      ekaterina: t('ekaterina'),
      mikalai: t('mikalai'),
      role: {
        teamLead: t('teamLead'),
        developer: t('developer'),
      },
    },
  };

  return (
    <main className={style.main}>
      <div className={style.container}>
        <Welcome translate={translate} />
        <About translate={translate} />
      </div>
    </main>
  );
}
