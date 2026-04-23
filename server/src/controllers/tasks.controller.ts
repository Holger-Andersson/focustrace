import type { Request, Response } from "express";
import type { Task } from "../types/types"

let tasks: Task[] = [];

export const getTasks = (_req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const newTask = {
    id: crypto.randomUUID(),
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
};

export const toggleTaskCompleted = (req: Request<{id: string}>, res: Response) => {
  const { id } = req.params;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  const newTask = tasks.find((t) => t.id === id);
  console.log(`Task ${id} toggled, current state: ${newTask?.completed}`);
  res.json({ ok: true });
};

export const deleteTask = (req: Request, res: Response) => {
 const {id} = req.params;

 tasks = tasks.filter((task) => task.id !== id);

 res.json({ ok: true })
}