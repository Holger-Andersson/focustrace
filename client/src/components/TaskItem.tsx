import type { Task } from "../types/types"

type Props = {
    readonly task: Task;
    readonly onToggle: (id: string) => void;
    readonly onDelete: (id: string) => void;
};

export function TaskItem({ task, onToggle, onDelete}: Props) {
    return (
        <li>
            <div className="task-left">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                    <span className={task.completed ? "completed" : ""}>{task.title}</span>
                            </div>
                            <button className="delete-btn" onClick={() => onDelete(task.id)}>X</button>
        </li>
    )
}