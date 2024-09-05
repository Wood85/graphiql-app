export function isContentJSON(response: Response): boolean {
  const header = new Headers(response.headers).get('Content-Type') ?? '';

  return header.toLowerCase().includes('json');
}

export function isContentTextOrHTML(response: Response): boolean {
  const header = new Headers(response.headers).get('Content-Type') ?? '';

  return header.toLowerCase().includes('text') || header.toLowerCase().includes('html');
}

export function isContentImage(response: Response): boolean {
  const header = new Headers(response.headers).get('Content-Type') ?? '';

  return header.toLowerCase().includes('image');
}
