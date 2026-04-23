import type { Task } from "../types/types";
import { Timer } from "./Timer";

type Props = {
  readonly task: Task;
  readonly onDelete: (id: string) => void;
  readonly onUpdateStatus: (id: string, status: Task["status"]) => void;
};

export function TaskItem({ task, onDelete, onUpdateStatus }: Props) {
  return (
    <li className={task.status}>
      <div className="task-left">
        <span>{task.title}</span>
        {task.status === "planned" && (
          <button
            className="status-btn"
            onClick={() => onUpdateStatus(task.id, "active")}
          >
            Start
          </button>
        )}
        {task.status === "active" && (
          <>
            <Timer startedAt={task.startedAt} />
            <button
              className="status-btn"
              onClick={() => onUpdateStatus(task.id, "done")}
            >
              Complete
            </button>
          </>
        )}
        {task.status === "done" && <span>✅</span>}
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ×
      </button>
    </li>
  );
}
