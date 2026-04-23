import type { Request, Response } from "express";
import type { Task, UpdateStatusBody, CreateTaskBody } from "../types/types";

let tasks: Task[] = [];

export const getTasks = (_req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
) => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: req.body.title,
    status: "planned",
    createdAt: Date.now(),
  };
  tasks.push(newTask);
  res.json(newTask);
};

export const updateTaskStatus = (
  req: Request<{ id: string }, {}, UpdateStatusBody>,
  res: Response,
) => {
  const { id } = req.params;
  const { status } = req.body;

  tasks = tasks.map((task) => (task.id === id ? { ...task, status } : task));

  const updatedTask = tasks.find((t) => t.id === id);
  console.log(`Task ${id} updated, current state: ${updatedTask?.status}`);
  res.json(updatedTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;

  tasks = tasks.filter((task) => task.id !== id);

  res.json({ ok: true });
};
