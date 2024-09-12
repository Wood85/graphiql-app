import Footer from '@/app/[locale]/components/Footer/Footer';
import Header from '@/app/[locale]/components/Header/Header';
import { routing } from '@/i18n/routing';
import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';

export const dynamic = 'force-dynamic';

export function generateStaticParams(): Array<{
  locale: 'en' | 'ru';
}> {
  return routing.locales.map((locale) => ({ locale }));
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}): Promise<JSX.Element> {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${ceraPro.className} body`}>
        <NextIntlClientProvider messages={messages}>
          <div className='body-container'>
            <Header />
            <div className='body-content'>{children}</div>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
