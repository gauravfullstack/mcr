import React from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

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
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Todo App</h2>

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