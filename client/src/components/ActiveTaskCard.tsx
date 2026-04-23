  import type { Task } from "../types/types"
  import { Timer } from "./Timer"
  
  type Props = {
    readonly task: Task;
    readonly onUpdateStatus: (id: string, status: Task["status"]) => void;

  }
  
  export function ActiveTaskCard({ task, onUpdateStatus}: Props) {
    return (
      <div className="active-card">
        <h2>{task.title}</h2>

        <Timer startedAt={task.startedAt} />

        <button className="complete-btn" onClick={() => onUpdateStatus(task.id, "done")}>
          Complete
        </button>
      </div>
    )
  }