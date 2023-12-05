import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import supabaseServerClient from "@/lib/supabase/serverClient";

async function BoardsPage({
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
      <main className="grid place-items-center">
        <div className=" max-w-[21rem] space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            This board is empty. Create a new column to get started.
          </p>
          <Button size="large">+Add New Column</Button>
        </div>
      </main>
    </div>
  );
}

export default BoardsPage;
