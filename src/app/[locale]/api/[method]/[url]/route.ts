import type { NextResponse } from 'next/server';

import type { IUrlRouteParams } from '@/interfaces/UrlRouteParams';
import handleRequest from '@/utils/handleRequest';

export async function GET(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}

export async function DELETE(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}

export async function HEAD(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}

export async function OPTIONS(request: Request, { params }: IUrlRouteParams): Promise<NextResponse> {
  const result = await handleRequest(request, { params });

  return result;
}
