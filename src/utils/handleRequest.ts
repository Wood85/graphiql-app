import { NextResponse } from 'next/server';

import sizeOf from 'image-size';

import type { IUrlRouteParams } from '@/interfaces/UrlRouteParams';
import { TRequestMethod } from '@/interfaces/RequestMethod';
import type { IResponse } from '../interfaces/Response';
import processingParams from './processingParams';
import { contentIsJSON, contentIsImage, contentIsText } from './responseHelpers';
import { GRAPHQL } from './constants';

export default async function handleRequest(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const { method, url, params: body } = params;
  const encodedBody = body !== undefined ? JSON.stringify(JSON.parse(atob(body.toString()))) : null;
  //  The replacement below is necessary because the atob method uses the '/' character when
  //  encoding the string. This address string is misinterpreted during routing, so we
  //  use the '+' character instead and reverse the substitution on the server side.
  const encodedUrl = atob(url.replace(/\+/g, '/'));
  const { search: headersAsQueryParams } = new URL(request.url);
  const headers = processingParams(headersAsQueryParams);
  const { origin } = new URL(encodedUrl);

  try {
    const response = await fetch(method === TRequestMethod.HEAD ? origin : encodedUrl, {
      method: method === GRAPHQL ? TRequestMethod.POST : method,
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

    if (contentIsText(response)) {
      const text = await response.text();
      data = {
        text,
      };
    }

    if (contentIsJSON(response)) {
      data = await response.json();
    }

    if (contentIsImage(response)) {
      const buffer = await response.arrayBuffer();
      const dimensions = sizeOf(Buffer.from(buffer));
      data = {
        url: response.url,
        width: dimensions.width,
        height: dimensions.height,
      };
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
