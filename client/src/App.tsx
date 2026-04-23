import { useEffect, useState } from "react";
import type { Task } from "./types/types";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { ActiveTaskCard } from "./components/ActiveTaskCard"

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const activeTask = tasks.find((t) => t.status === "active");
  const otherTasks = tasks.filter((t) => t.status !== "active");



  const handleAdd = async (title: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    //loops thru array and removes the choosen id -> state changes -> UI updates
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateStatus = async (id: string, status: Task["status"]) => {
    await fetch(`/api/tasks/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              startedAt:
                status === "active" && !task.startedAt
                  ? Date.now()
                  : task.startedAt,
            }
          : task,
      ),
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);
  return (
    <div className="app">
      <h1>FocusTrace</h1>
      <TaskInput onAdd={handleAdd} />
      {activeTask && (
        <ActiveTaskCard
          task={activeTask}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
      {otherTasks.length > 0 && <h2 className="section-title">Queue</h2>}
      <TaskList
        tasks={otherTasks}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
