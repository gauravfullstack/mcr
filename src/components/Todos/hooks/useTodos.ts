import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addOrUpdateTodo = () => {
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: input } : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: input, completed: false },
      ]);
    }

    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id: number, text: string) => {
    setInput(text);
    setEditingId(id);
  };

  return {
    todos,
    input,
    setInput,
    editingId,
    addOrUpdateTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };
};