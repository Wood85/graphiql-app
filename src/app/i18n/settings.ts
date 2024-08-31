export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ru'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

interface IReturn {
  supportedLngs: string[];
  fallbackLng: string;
  lng: string;
  fallbackNS: string;
  defaultNS: string;
  ns: string | string[];
}

export function getOptions(lng = fallbackLng, ns = defaultNS): IReturn {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
