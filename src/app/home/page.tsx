import Icon from "@/icons/landing.svg";
import CreateBoard from "@/components/Modals/Board/CreateBoard";
import Navbar from "@/components/Navbar";

function Page() {
  return (
    <div className="flex h-full w-full flex-col">
      {/* <Navbar /> */}
      <div className="grid h-full place-content-center">
        <div className="flex flex-col items-center gap-4 p-6">
          <Icon className="w-[300px] md:w-[400px]" />
          <p className="text-center">
            Add your tasks or create a new Board to get started.
          </p>
          {/* <CreateBoard /> */}
        </div>
      </div>
    </div>
  );
}

export default Page;
