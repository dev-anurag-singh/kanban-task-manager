import Button from "@/components/Button";

async function Board() {
  return (
    <div className="grid basis-full place-items-center">
      <div className=" max-w-[21rem] space-y-6 text-center">
        <p className="text-muted-foreground text-lg">
          This board is empty. Create a new column to get started.
        </p>
        <Button size="large">+Add New Column</Button>
      </div>
    </div>
  );
}

export default Board;
