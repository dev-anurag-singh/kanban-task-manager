import { redirect } from "next/navigation";
import supabase from "@/lib/supabase/serverClient";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

async function AppLayout({ children }: { children: React.ReactNode }) {
  // REDIRECTING UNAUTHENTICATED USER
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  // Dummy data later will come from server
  const boards = [
    {
      id: "121",
      title: "platform launch",
    },
    {
      id: "122",
      title: "marketing plan",
    },
    {
      id: "123",
      title: "roadmap",
    },
  ];

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-layout">
      <header className="transition-colors dark:bg-grey-dark">
        <Navbar />
      </header>
      <div className="relative flex">
        <Sidebar boards={boards} />
        <main className="flex grow bg-grey-light transition-colors dark:bg-grey-darkest">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
