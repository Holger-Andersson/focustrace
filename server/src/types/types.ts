export type Task = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  createdAt: number;
  StartedAt?: number;
};

export type UpdateStatusBody = {
  status: "planned" | "active" | "done";
};

export type CreateTaskBody = {
  title: string;
};
