import { useEffect, useState } from "react";
import type { Task } from "./types/types"
import { TaskInput } from "./components/TaskInput"
import { TaskList } from "./components/TaskList"

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = async (title: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({title}),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask])
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    //loops thru array and removes the choosen id -> state changes -> UI updates
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggle = async (id: string): Promise<void> => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
    });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed} : task,
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
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete}/>
    </div>
  );
}

export default App;
