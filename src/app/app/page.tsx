import { Button } from "@/components/ui/button";

function Page() {
  return (
    <main className="grid h-full place-items-center">
      <div className=" max-w-[21rem] space-y-6 text-center">
        <p className="text-lg text-muted-foreground">
          You can create a new board by just clicking below
        </p>
        <Button size={"lg"}>Create a Board</Button>
      </div>
    </main>
  );
}

export default Page;
