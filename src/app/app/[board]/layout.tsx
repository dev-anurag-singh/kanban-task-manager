import Navbar from "@/components/Navbar";
import supabaseServerClient from "@/lib/supabase/serverClient";

async function BoardLayout({
  params,
  children
}: {
  children:React.ReactNode,
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
      <div className="grid place-content-center text-lg text-muted-foreground">
        Not Found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 grid-rows-layout">
      <div className="border-b bg-muted">
        <Navbar board={board} />
      </div>
      <main className="grid">
        {children}
      </main>
    </div>
  );
}

export default BoardLayout;
