export type Task = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  createdAt: number;
  startedAt?: number;
};
