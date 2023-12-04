import { redirect } from "next/navigation";
import supabaseServerClient from "@/lib/supabase/serverClient";
import Sidebar from "@/components/Sidebar";

async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServerClient();
  // REDIRECTING UNAUTHENTICATED USER
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: boards } = await supabase.from("boards").select("*");

  return (
    <div className="relative flex h-screen">
      <Sidebar boards={boards} />
      <div className="grid grow">{children}</div>
    </div>
  );
}

export default AppLayout;
