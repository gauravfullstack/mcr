"use client";

import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { useToast } from "./useToast";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  // Load todos from localStorage
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos");

      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist todos to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos, isLoaded]);

  const addOrUpdateTodo = () => {
    if (!input.trim()) {
      addToast("Please enter a task.", "error");
      return;
    }

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: input }
            : todo
        )
      );

      setEditingId(null);
      addToast("Todo updated successfully.", "success");
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
      };

      setTodos((prev) => [...prev, newTodo]);
      addToast("Todo added successfully.", "success");
    }

    setInput("");
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
    if (todoToDelete) {
      addToast("Todo deleted successfully.", "info");
    }
  };

  const toggleTodo = (id: number) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
    if (todoToToggle) {
      addToast(
        todoToToggle.completed
          ? "Todo marked as incomplete."
          : "Todo completed.",
        "info"
      );
    }
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
    toasts,
    removeToast,
  };
};
