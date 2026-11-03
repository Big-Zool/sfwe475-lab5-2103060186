import Link from "next/link";
import type { Task } from "@/lib/schemas";

type TaskCardProps = Pick<Task, "id" | "title" | "done" | "dueDate" | "status"> & {
  onToggleTask: (id: number) => void;
};

function TaskCard({ id, title, done, dueDate, status, onToggleTask }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>
        <Link href={`/tasks/${id}`}>{title}</Link>
      </h3>
      {dueDate && <p>Due: {dueDate}</p>}
      {status && <p>Status: {status}</p>}
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggleTask(id)}
        aria-label={`Mark "${title}" as done`}
      />
    </div>
  );
}

export default TaskCard;
