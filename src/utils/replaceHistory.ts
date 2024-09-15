import { TRequestMethod } from '../interfaces/RequestMethod';
import { GRAPHQL } from './constants';

type TPlaceToPush = 'method' | 'url' | 'body' | 'headers';

const isBodyApplicable = (requestMethod: TRequestMethod | typeof GRAPHQL): boolean =>
  requestMethod === TRequestMethod.POST ||
  requestMethod === TRequestMethod.PUT ||
  requestMethod === TRequestMethod.PATCH ||
  requestMethod === GRAPHQL;

export function replaceInHistory(place: TPlaceToPush, value: string | TRequestMethod | Record<string, string>): void {
  const { origin, pathname, search } = window.location;
  const urlSegments = pathname.match(/\/([^/]*)/g)?.map((segment) => segment.replace('/', ''));

  const lang = urlSegments?.[0] ?? '';
  const route = urlSegments?.[1] ?? '';
  const method = place === 'method' ? (value as TRequestMethod) : ((urlSegments?.[2] ?? '') as TRequestMethod);
  const endpointUrl = place === 'url' ? btoa(value as string).replace(/\//g, '+') : (urlSegments?.[3] ?? '');
  const body = place === 'body' ? (value as string) : atob(urlSegments?.[4] ?? '');
  const bodyEncoded = isBodyApplicable(method) ? btoa(body.replace(/'+/g, '"')) : '';
  const headers = place === 'headers' ? (value as Record<string, string>) : search;
  const searchParams = new URLSearchParams(headers).toString();
  const tailUrl = `${method}/${endpointUrl}${isBodyApplicable(method) ? `/${bodyEncoded}` : ''}?${searchParams}`;
  const url = `${origin}/${lang}/${route}/${tailUrl}`;

  window.history.replaceState(null, '', url);
}
