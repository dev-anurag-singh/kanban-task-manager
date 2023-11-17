import { redirect } from 'next/navigation';
import supabase from '@/lib/supabase/serverClient';

async function AppLayout({ children }: { children: React.ReactNode }) {
  // redirecting unauthenticated user to login page

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  //

  return <>{children}</>;
}

export default AppLayout;
