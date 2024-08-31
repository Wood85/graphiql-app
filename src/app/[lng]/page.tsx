import { useTranslation } from '../i18n';
import { fallbackLng, languages } from '../i18n/settings';
import styles from './page.module.scss';

interface IProps {
  params: {
    lng: string;
  };
}

export default async function Page({ params: { lng } }: IProps): Promise<JSX.Element> {
  const { t } = await useTranslation(languages.includes(lng) ? lng : fallbackLng);

  return (
    <main className={styles.main}>
      <h1>{t('title')}</h1>
    </main>
  );
}
