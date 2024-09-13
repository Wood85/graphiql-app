import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface IProps {
  locale: string;
}
export default getRequestConfig(async ({ locale }: IProps) => {
  const locales = ['en', 'ru'];
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
