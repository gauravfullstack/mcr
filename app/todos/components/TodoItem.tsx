import React from "react";
import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  onEdit,
}) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
        }}
      >
        {todo.text}
      </span>

      <div>
        <button onClick={() => onEdit(todo.id, todo.text)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;