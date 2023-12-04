import Navbar from "@/components/Navbar";
import supabaseServerClient from "@/lib/supabase/serverClient";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    board: string;
  };
}) {
  const supabase = await supabaseServerClient();

  const { data: board } = await supabase
    .from("boards")
    .select("*")
    .eq("id", params.board)
    .single();

  if (!board) {
    return (
      <div className="text-muted-foreground grid place-content-center text-lg">
        Not Found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 grid-rows-layout">
      <div className="bg-muted border-b">
        <Navbar board={board} />
      </div>
      <main className="grid">{children}</main>
    </div>
  );
}

export default Layout;
