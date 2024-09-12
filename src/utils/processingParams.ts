export default function processingParams(queryParams: string): Record<string, string> {
  const query = new URLSearchParams(queryParams);
  const params = Array.from(query.entries()).map(([key, value]) => [key, value]);

  return Object.fromEntries(params);
}
