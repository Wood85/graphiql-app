import { createInstance, type FlatNamespace, type i18n, type KeyPrefix, type Namespace, type TFunction } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { type FallbackNs } from 'react-i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

const initI18next = async (lng: string, ns: string): Promise<i18n> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string, namespace: string) => {
        const res = await import(`./locales/${language}/${namespace}.json`);
        return res;
      }),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation<Ns extends FlatNamespace, KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined>(
  lng: string,
  ns?: Ns,
  options: { keyPrefix?: KPrefix } = {},
): Promise<{
  t: TFunction<Namespace, KPrefix>;
  i18n: i18n;
}> {
  const i18nextInstance = await initI18next(lng, ns as string);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns as string | string[]) ? (ns as string) : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
