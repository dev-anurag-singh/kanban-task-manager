import { getTaskById } from "@/actions/get-task-by-id";

async function Task({ taskId }: { taskId: string }) {
  const task = await getTaskById(taskId);

  const subtasksCount = task?.subtasks.length;

  const completedSubtasks = task?.subtasks.filter(
    ({ completed }) => completed === true,
  );

  const completedSubtasksCount = completedSubtasks?.length;

  return (
    <div className="group w-72 cursor-pointer space-y-2 rounded-lg bg-muted px-4 py-6 shadow-md">
      <h4 className="text-lg text-foreground group-hover:text-primary">
        {task?.title}
      </h4>
      {!subtasksCount ? null : (
        <p className=" text-sm text-muted-foreground">
          {completedSubtasksCount} of {subtasksCount}
        </p>
      )}
    </div>
  );
}

export default Task;
