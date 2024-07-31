'use server';

import { cookies } from 'next/headers';

export async function fetchJSON<Result, Payload = never>(
  url: string | URL,
  options: Omit<RequestInit, 'body'> & { body?: Payload } = {},
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

// For uploading files
export async function uploadHt6<Result>(
  path: string,
  file: File,
  options: Omit<RequestInit, 'body'> & { fileName: string },
) {
  const body = new FormData();
  body.set(options.fileName, file);
  const res = await fetch(new URL(path, process.env.API_HOST), {
    ...options,
    headers: {
      ...options.headers,
      'X-Access-Token': cookies().get('token')?.value ?? '',
    },
    body,
  });
  return res.json<Result>();
}

export async function fetchHt6<Result, Payload = never>(
  path: string,
  options: Omit<RequestInit, 'body'> & { body?: Payload } = {},
) {
  return fetchJSON<Result, Payload>(new URL(path, process.env.API_HOST), {
    ...options,
    headers: {
      ...options.headers,
      'X-Access-Token': cookies().get('token')?.value ?? '',
    },
  });
}

export async function fetchAirtable<Result>(
  path: string | URL,
  options?: Omit<RequestInit, 'body'>,
) {
  return fetchJSON<Result, never>(path, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
    },
  });
}

export async function fetchAirtableResults<Result>(
  table: string,
  sheet: string,
  filters?: URLSearchParams,
) {
  return fetchAirtable<Result>(
    new URL(`/v0/${table}/${sheet}?${filters ?? ''}`, process.env.AIRTABLE_URL),
    {
      next: { revalidate: 30 },
    },
  );
}
