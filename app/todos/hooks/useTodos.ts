"use client";

import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: input }
            : todo
        )
      );

      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
      };

      setTodos((prev) => [...prev, newTodo]);
    }

    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  const toggleTodo = (id: number) => {
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