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
      <h1>FocusFlow</h1>

      <div className="input-group">
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
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(task.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
