'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { COOKIES } from '../constants';

export async function setToken(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set(COOKIES.TOKEN, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function clearToken() {
  (await cookies()).delete(COOKIES.TOKEN);
}
