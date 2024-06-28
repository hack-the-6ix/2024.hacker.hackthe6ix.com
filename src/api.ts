export async function fetchJSON<Payload, Result>(
  url: string | URL,
  options: Omit<RequestInit, 'body'> & { body: Payload },
) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(options.body),
  });
  return res.json<Result>();
}
