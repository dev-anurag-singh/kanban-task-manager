import CreateBoard from "@/components/Modals/Board/CreateBoard";
import Navbar from "@/components/Navbar";

function Page() {
  return (
    <div className="grid grow grid-cols-1 grid-rows-[auto_1fr] overflow-hidden md:grid-rows-1">
      <Navbar />
      <main className="grid h-full grow place-items-center">
        <div className=" max-w-[21rem] space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            You can create a new board by just clicking below
          </p>
          <CreateBoard />
        </div>
      </main>
    </div>
  );
}

export default Page;
