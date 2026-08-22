import React from "react";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  onToggle,
  onEdit,
}) => {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;