'use server';

import 'server-only';
import { PATH_NAME } from '@/app/constants/pathName';
import { clearToken, setToken } from '@/app/lib/session';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const loginSchema = z.object({
  userName: z.string().trim(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .trim(),
});

// export const login = async (prevState: any, formData: FormData) => {
export const login = async (result: {
  data: { userName: string; password: string };
}) => {
  //TODO handle login

  // const result = loginSchema.safeParse(Object.fromEntries(formData));

  // if (!result.success) {
  //   return {
  //     errors: JSON.stringify(result.error.flatten().fieldErrors),
  //   };
  // }

  let redirectPath: string | null = null;
  try {
    const { userName, password } = result.data;
    const response = await axios.post('http://localhost:5000/login', {
      userName,
      password,
    });
    if (response.status == 200) {
      const token = response.data?.token;

      await setToken(token);

      return { accessToken: token };
    }
  } catch (error) {
    console.log({ error });

    return { errors: JSON.stringify(error) };
  } finally {
    //Clear resources
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
};

export async function logout() {
  await clearToken();

  redirect(PATH_NAME.LOGIN);
}
