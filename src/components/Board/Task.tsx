interface TaskProps {
  task: {
    id: string;
    title: string;
    order: Number;
  };
}

function Task({ task }: TaskProps) {
  return (
    <div className="group w-72 cursor-pointer space-y-2 rounded-lg bg-muted px-4 py-6 shadow-md">
      <h4 className="text-lg text-foreground group-hover:text-primary">
        {task.title}
      </h4>
      <p className=" text-sm text-muted-foreground">0 of 3 subtasks</p>
    </div>
  );
}

export default Task;
