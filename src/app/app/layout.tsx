import { redirect } from 'next/navigation';
import supabase from '@/lib/supabase/serverClient';
import Navbar from '@/components/Navbar';
import Modal from '@/components/Modal';
import Sidebar from '@/components/Sidebar';

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
    <div className='h-screen grid grid-cols-1 grid-rows-layout'>
      <div className='border-b border-lines-light'>
        <Navbar />
      </div>
      <div className='flex relative'>
        <Sidebar />
        <div className='bg-grey-light grow px-4 py-6 flex'>{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
