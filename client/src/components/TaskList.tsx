import type { Task } from "../types/types";
import { TaskItem } from "./TaskItem";

type Props = {
  readonly tasks: Task[];
  readonly onDelete: (id: string) => void;
  readonly onUpdateStatus: (id: string, status: Task["status"]) => void;
};

export function TaskList({ tasks, onDelete, onUpdateStatus }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
