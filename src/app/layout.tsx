import type { Metadata } from 'next';
import localFont from 'next/font/local'
import './globals.scss';

const ceraPro = localFont({
  src: [
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
})

export const metadata: Metadata = {
  title: "GraphiQL App",
  description: "Application for using and building apis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ceraPro.className}>{children}</body>
    </html>
  );
}
