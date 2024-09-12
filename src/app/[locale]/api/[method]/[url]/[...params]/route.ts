import type { NextResponse } from 'next/server';

import type { IUrlRouteParams } from '@/interfaces/UrlRouteParams';
import handleRequest from '@/utils/handleRequest';

export async function POST(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}

export async function PUT(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}

export async function PATCH(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}
