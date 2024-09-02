import { NextResponse } from 'next/server';

import type { IUrlRouteParams } from '@/interfaces/UrlRouteParams';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import processingParams from './processingParams';

export default async function handleRequest(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const { method, url, params: body } = params;
  const encodedBody = body !== undefined ? JSON.stringify(JSON.parse(atob(body.toString()))) : null;
  //  The replacement is necessary because the atob method uses the '/' character when
  //  encoding the string. This address string is misinterpreted during routing, so we
  //  use the '+' character instead and reverse the substitution on the server side.
  const encodedUrl = atob(url.replace(/\+/g, '/'));
  const { search: headersAsQueryParams } = new URL(request.url);
  const headers = processingParams(headersAsQueryParams);

  try {
    const response = await fetch(encodedUrl, {
      method: method.toUpperCase(),
      headers,
      body: encodedBody,
    });

    const data = method !== TRequestMethod.HEAD && method !== TRequestMethod.OPTIONS ? await response.json() : null;

    const plainHeaders = Object.fromEntries(response.headers.entries());

    return NextResponse.json(
      method === TRequestMethod.HEAD
        ? { data }
        : {
            ok: response.ok,
            data,
            status: response.status,
            statusText: response.statusText,
            headers: plainHeaders,
          },
      method === TRequestMethod.HEAD ? { status: 200, headers: response.headers } : {},
    );
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
