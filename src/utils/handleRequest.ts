import { NextResponse } from 'next/server';

import type { IUrlRouteParams } from '@/interfaces/UrlRouteParams';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '../interfaces/Response';
import processingParams from './processingParams';
import { isContentImage, isContentJSON, isContentTextOrHTML } from './responseHelpers';

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

    if (method === TRequestMethod.HEAD) {
      return NextResponse.json(
        {},
        {
          status: 200,
          headers: response.headers,
        },
      );
    }

    let data = null;

    if (isContentTextOrHTML(response)) {
      const text = await response.text();
      data = {
        text,
      };
    }

    if (isContentJSON(response)) {
      data = await response.json();
    }

    if (isContentImage(response)) {
      data = {
        url: response.url,
      };
    }

    if (method === TRequestMethod.OPTIONS) {
      data = null;
    }

    const plainHeaders = Object.fromEntries(response.headers.entries());

    return NextResponse.json<IResponse>(
      {
        body: data,
        status: response.status,
        statusText: response.statusText,
        headers: plainHeaders,
      },
      {
        headers: { 'Content-type': 'application/json' },
      },
    );
  } catch (e) {
    const error = (e as Error).message === '' ? 'Internal Server Error' : (e as Error).message;
    return NextResponse.json({ error }, { status: 500 });
  }
}
