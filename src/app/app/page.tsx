import Button from "@/components/Button";

function Home() {
  return (
    <div className="grid basis-full place-items-center">
      <div className=" max-w-[21rem] space-y-6 text-center">
        <p className="text-muted-foreground text-lg">
          Create a new board to get started.
        </p>
        <Button size="large">+Create New Board</Button>
      </div>
    </div>
  );
}

export default Home;
