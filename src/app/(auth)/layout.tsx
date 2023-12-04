import { LogoFull } from '@/components/Logo';
import supabaseServerClient from '@/lib/supabase/serverClient';
import {redirect} from 'next/navigation'

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/app');
  }

  return (
    <div className='p-8 flex flex-col md:min-h-screen md:items-center md:justify-center'>
      <div className='flex flex-col gap-16 md:items-center'>
        <div>
          <LogoFull />
        </div>
        <div className='md:w-[30rem]'>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
