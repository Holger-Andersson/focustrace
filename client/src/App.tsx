import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    //loops thru array and removes the choosen id -> state changes -> UI updates
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggle = async (
    id: string,
    currentCompleted: boolean,
  ): Promise<void> => {
    const updatedCompleted = !currentCompleted;

    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedCompleted }),
    });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: updatedCompleted } : task,
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
    <div style={{ padding: 20 }}>
      <h1>FocusFlow</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />

      <button
        onClick={async () => {
          const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
          });
          const newTask = await res.json();
          setTasks([...tasks, newTask]);
          setTitle("");
        }}
      >
        Add
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id, task.completed)}
            />
            {task.title}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
