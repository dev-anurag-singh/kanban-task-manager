import { redirect } from 'next/navigation';
import supabase from '@/lib/supabase/serverClient';
import Navbar from '@/components/Navbar';

async function AppLayout({ children }: { children: React.ReactNode }) {
  // REDIRECTING UNAUTHENTICATED USER
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }
  //

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
