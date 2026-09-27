
```markdown
Functional Requirements:

1. Display a list of todos.
2. User can add a new todo using input box and Add button.
3. User can delete a todo.
4. User can toggle a todo as complete or incomplete.
5. Completed todos show strikethrough text.
6. If no todos present, show "No todos yet" text.
7. Enter key should also trigger add todo.



Data Model:

1. Todo = {
     id: string,
     text: string,
     completed: boolean
   }



High Level Design:

app
  todo
    components
      TodoInput.tsx     → input box + add button
      TodoList.tsx      → list of all todos
      TodoItem.tsx      → single todo row
    hooks
      useTodos.ts       → all logic here
    types
      index.ts
    page.tsx



Business Logic:

1. State — single `todos` array in useTodos.ts
   manages all todos together.

2. addTodo(text)
   - Validate: if text is empty → return early
   - Create new todo: { id: crypto.randomUUID(), text, completed: false }
   - Immutable update using spread → [...todos, newTodo]
   - Clear input after adding

3. deleteTodo(id)
   - Filter out todo with matching id
   - Immutable update using .filter()

4. toggleTodo(id)
   - Find todo with matching id
   - Flip completed: !todo.completed
   - Immutable update using .map()

5. Enter key support
   - onKeyDown → if key === 'Enter' → call addTodo

6. Empty state
   - if todos.length === 0 → show "No todos yet"

7. Completed style
   - if todo.completed → textDecoration: line-through

8. Input state lives locally in TodoInput.tsx
   — not in the hook
```

---

## What to say in interview

> *"Three operations — add, delete, toggle.
> All immutable — spread for add,
> filter for delete, map for toggle.
> Input state stays local in TodoInput —
> only todos array lives in the hook."*

---