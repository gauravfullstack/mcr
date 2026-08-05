# 🎯 Machine Coding Round Plan — Todo App (CRUD)

---

# ⏱️ Time Split (45 min interview)

| Time   | Activity             |
| ------ | -------------------- |
| 2 min  | Clarify requirements |
| 3 min  | Think out loud       |
| 5 min  | Plan on paper        |
| 30 min | Code                 |
| 5 min  | Review + Edge cases  |

---

# Step 1: Clarifying Requirements

> 💬 *"I'd like to clarify a few things before I proceed…"*

### Functional Requirements

* ✅ User can add a new todo.
* ✅ User can edit an existing todo.
* ✅ User can delete a todo.
* ✅ User can mark a todo as completed/uncompleted.
* ✅ Input field should be reused for both add and edit operations.

### Smart Questions to Ask

* Should todos persist after page refresh or remain in memory?
* Should I use mock data or start with an empty list?
* Should duplicate todo names be allowed?
* Should completed todos be editable?
* Should pressing Enter submit the todo?
* Is there any maximum length for a todo?

---

# Step 2: Data Model

> 💬 *"I'll use a unique id instead of array index to avoid update and delete bugs."*

```ts
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
```

### State Needed

```ts
todos: Todo[]
input: string
editingId: number | null
```

---

# Step 3: Component Design

> 💬 *"I'll keep the state inside a custom hook and App will act as the orchestrator."*

## Component Tree

```text
TodoApp
│
├── TodoInput
│      ├── Input Field
│      └── Add / Update Button
│
└── TodoList
       │
       ├── TodoItem
       ├── TodoItem
       └── TodoItem
```

---

## Folder Structure

```text
src/

├── components/
│     ├── TodoInput.tsx
│     ├── TodoList.tsx
│     └── TodoItem.tsx
│
├── hooks/
│     └── useTodos.ts
│
├── types/
│     └── todo.ts
│
└── TodoApp.tsx
```

---

## Component Responsibilities

| Component | Responsibility                                    |
| --------- | ------------------------------------------------- |
| TodoApp   | Connects hook with UI components                  |
| TodoInput | Handles text input and Add/Update button          |
| TodoList  | Renders list of todos                             |
| TodoItem  | Displays one todo with Edit/Delete/Toggle actions |
| useTodos  | Contains all business logic and state             |

---

# Step 4: State Design

> 💬 *"I'll update state immutably so React can efficiently detect changes."*

```ts
const [todos, setTodos] = useState<Todo[]>([]);
const [input, setInput] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);
```

### Derived State

Instead of storing these:

```ts
const completedCount = todos.filter(todo => todo.completed).length;

const pendingCount = todos.length - completedCount;
```

No need to store them separately.

---

# Step 5: Core Operations

> 💬 *"All operations will be immutable using map and filter."*

## Add Todo

```ts
1. Validate input
2. Create new Todo
3. Append to array
4. Clear input
```

---

## Update Todo

```ts
1. Find matching id
2. Replace text using map
3. Reset editing mode
4. Clear input
```

---

## Delete Todo

```ts
Filter out matching todo
```

---

## Toggle Completion

```ts
Map through todos

If ids match

toggle completed

Else return original
```

---

## Edit Todo

```ts
Populate input

Store editing id

Next submit updates existing todo
```

---

# Step 6: UI Behavior Plan

* ✅ User types inside input.
* ✅ Clicking **Add** creates a new todo.
* ✅ Clicking **Edit** fills the input with existing text.
* ✅ Button changes from **Add** to **Update** while editing.
* ✅ Clicking **Update** saves the changes.
* ✅ Clicking **Delete** removes the todo.
* ✅ Clicking checkbox toggles completion.
* ✅ Todos render using `.map()` with `todo.id` as the key.

---

# Step 7: Edge Cases

> 💬 *"Let me think about a few edge cases before I begin coding."*

| Edge Case                          | Handling                              |
| ---------------------------------- | ------------------------------------- |
| Empty input                        | Ignore submission using `trim()`      |
| Whitespace only                    | Prevent adding                        |
| Empty todo list                    | Show "No todos available"             |
| Editing then deleting another todo | Editing state remains unaffected      |
| Editing then clearing input        | Prevent update                        |
| Long text                          | Let input wrap or optionally truncate |
| Toggle multiple times              | State updates immutably               |

---


# Step 9: Transition to Code

> 💬 *"I'll start by defining the type, then implement the custom hook for business logic, followed by small presentational components, and finally wire everything together in the main TodoApp. I'll prioritize correctness and readability first, then optimize if needed."*

### Coding Order

```text
1. types/todo.ts

2. hooks/useTodos.ts

3. TodoInput.tsx

4. TodoItem.tsx

5. TodoList.tsx

6. TodoApp.tsx
```

---

## 🎤 What makes this sound senior in an interview

As you explain your approach, naturally mention points like:

* "I'm separating business logic into a custom hook to keep the UI components focused on presentation."
* "I'm using immutable updates with `map` and `filter` to ensure predictable React state updates."
* "The input component is reused for both add and edit flows to avoid duplication."
* "Each `TodoItem` is an independent presentational component, which keeps the list component simple and makes future enhancements easier."
* "I'm using a unique `id` as the React key instead of the array index to avoid rendering issues during updates and deletions."

