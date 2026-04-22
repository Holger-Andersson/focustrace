type Task = {
    id: string;
    title: string;
    completed: boolean;
};

let tasks: Task[] = [];

import express from "express"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const {title} = req.body;

    const newTask: Task = {
        id:crypto.randomUUID(),
        title,
        completed:false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
    const {id} = req.params;

    console.log("incoming id:", id)

    tasks = tasks.map((task) =>
        task.id === id
    //copy the task and changes the boolean true/false -> checked/unchecked
    ? {...task, completed: !task.completed }
    : task
    );

    const newTask = tasks.find((t) => t.id === id)

    console.log(`Task ${id} toggled, current state: ${newTask?.completed}`)
    res.json ({ ok: true})
    
})

app.delete ("/api/task/:id", (req, res) => {
    const {id } = req.params;

    tasks = tasks.filter((task) => task.id !== id);

    res.json({ok: true});
});



const PORT = 5000;

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
