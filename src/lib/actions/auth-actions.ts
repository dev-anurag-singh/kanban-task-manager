'use server';
import z from 'zod';
import supabase from '../supabase/serverClient';
import { redirect } from 'next/navigation';

export async function signIn(
  prevState: string | undefined,
  formData: FormData
) {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

  if (!parsedCredentials.success) {
    return 'Parsing Failed';
  }

  const { email, password } = parsedCredentials.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return 'Invalid Credentials';
  }

  redirect('/app');
}
