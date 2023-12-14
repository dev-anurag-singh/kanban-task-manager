import { supabaseBrowserClient } from "@/lib/supabase/browserClient";
import {
  TSignInValidator,
  TSignUpValidator,
} from "@/lib/validators/auth-credentails-validator";

export async function loginApi({ email, password }: TSignInValidator) {
  const { data, error } = await supabaseBrowserClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signupApi({ email, password }: TSignUpValidator) {
  const { data, error } = await supabaseBrowserClient.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
