import Button from "@/components/Button";

function BoardPage() {
  return (
    <div className="grid place-content-center">
      <div className="max-w-[21rem] space-y-6 text-center">
        <p className="text-lg text-muted-foreground">
          This board is empty. Create a new column to get started.
        </p>
        <Button size="large">+Add New Column</Button>
      </div>
    </div>
  );
}

export default BoardPage;
