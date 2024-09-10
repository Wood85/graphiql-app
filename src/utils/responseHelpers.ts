export function contentIsJSON(response: Response): boolean {
  const header = new Headers(response.headers).get('Content-Type') ?? '';

  return header.toLowerCase().includes('json');
}

export function contentIsText(response: Response): boolean {
  const header = new Headers(response.headers).get('Content-Type') ?? '';

  return (
    header.toLowerCase().includes('text') ||
    header.toLowerCase().includes('javascript') ||
    header.toLowerCase().includes('html')
  );
}

export function contentIsImage(response: Response): boolean {
  const header = new Headers(response.headers).get('Content-Type') ?? '';

  return header.toLowerCase().includes('image');
}
