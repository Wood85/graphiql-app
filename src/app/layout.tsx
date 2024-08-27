import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/globals.scss';

const ceraPro = localFont({
  src: [
    {
      path: './../assets/fonts/CeraPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../assets/fonts/CeraPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../assets/fonts/CeraPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'GraphiQL App',
  description: 'Application for using and building apis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang='en'>
      <body className={`${ceraPro.className} body`}>
        <div className='body-container'>
          <Header />
          <div className='body-content'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
