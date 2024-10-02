import { HttpResponse, http } from 'msw';

import fs from 'fs';
import path from 'path';

export const handlers = [
  http.head('https://test.com', () => new Response(null, { status: 200, headers: new Headers() })),
  http.get('https://test.com/text', () =>
    HttpResponse.text('Test text', { status: 200, headers: { 'Content-Type': 'plain/text' } }),
  ),
  http.get('https://test.com/json', () =>
    HttpResponse.json({ test: 'success' }, { status: 200, headers: { 'Content-Type': 'application/json' } }),
  ),
  http.post('https://test.com/json', () =>
    HttpResponse.json({ test: 'success' }, { status: 201, headers: { 'Content-Type': 'application/json' } }),
  ),
  http.get('https://test.com/image', () => {
    const imagePath = path.join(__dirname, '../../test-64x64.png');
    const buffer = fs.readFileSync(imagePath);
    const imageData = new Uint8Array(buffer);

    return new Response(imageData, { status: 200, headers: { 'Content-Type': 'image/png' } });
  }),
  http.head(
    'http://localhost:3000///HEAD/aHR0cHM6Ly90ZXN0LmNvbQ==',
    () => new Response(null, { status: 200, headers: new Headers() }),
  ),
];
