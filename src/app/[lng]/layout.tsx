import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Footer from '@/components/Footer/Footer';
// import Header from '@/components/Header/Header';
import '@/styles/globals.scss';

import Header from '@/components/Header/Header';
import { dir } from 'i18next';
import { useTranslation } from '../i18n';
import { fallbackLng, languages } from '../i18n/settings';

interface IProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export async function generateStaticParams(): Promise<
  Array<{
    lng: string;
  }>
> {
  return languages.map((lng) => ({ lng }));
}

const ceraPro = localFont({
  src: [
    {
      path: './../../assets/fonts/CeraPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../../assets/fonts/CeraPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../assets/fonts/CeraPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'GraphiQL App',
  description: 'Application for using and building apis',
};

export default async function RootLayout({ children, params: { lng } }: Readonly<IProps>): Promise<JSX.Element> {
  const { t } = await useTranslation(languages.includes(lng) ? lng : fallbackLng);
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${ceraPro.className} body`}>
        <div className='body-container'>
          <Header lang={lng} />
          <div className='body-content'>{children}</div>
          <div>{t('title')}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
