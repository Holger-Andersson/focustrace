import { useState } from "react";

type Props = {
  readonly onAdd: (title: string) => void;
};

export function TaskInput({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  return (
    <div className="input-group">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task.."
      />

      <button
        onClick={() => {
          onAdd(title);
          setTitle("");
        }}
      >
        Add
      </button>
    </div>
  );
}
