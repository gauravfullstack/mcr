'use client';

import React from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import styles from "./parent.module.css";

const TodoApp: React.FC = () => {
  const {
    todos,
    input,
    setInput,
    editingId,
    addOrUpdateTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  } = useTodos();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo App</h2>

      <TodoInput
        input={input}
        setInput={setInput}
        onSubmit={addOrUpdateTodo}
        isEditing={editingId !== null}
      />

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodo}
      />
    </div>
  );
};

export default TodoApp;