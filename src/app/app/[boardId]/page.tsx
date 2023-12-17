import { Button } from "@/components/ui/button";

async function BoardPage() {
  // just for testing purposes
  await new Promise((r) => setTimeout(r, 4000));

  return (
    <main className="grid h-full place-items-center p-6">
      <div className=" max-w-[21rem] space-y-6 text-center">
        <p className="text-lg text-muted-foreground">
          This board is empty. Create a new column to get started.
        </p>
        <Button size={"lg"}>+ Add new column</Button>
      </div>
    </main>
  );
}

export default BoardPage;
