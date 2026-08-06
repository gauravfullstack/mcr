# TODO APP - PHASE 1 INTERVIEW Q&A
---

## **EASY (Warm-up)**

### **1. What's the difference between state and props?**

**Answer:**
State is data that a component manages internally and can change. Props is data passed from parent to child, read-only.

**In your code:**
- `todos`, `input`, `editingId` in `useTodos` → **State** (can change)
- `input`, `setInput`, `onSubmit`, `isEditing` in `TodoInput` → **Props** (passed from TodoApp)
- `TodoItem` receives `todo`, `onDelete`, `onToggle`, `onEdit` → **Props**

---

### **2. Why do we use keys in lists? What happens without them?**

**Answer:**
Keys help React identify which items have changed. Without keys, React uses index (bad idea).

**In your code:**
```tsx
{todos.map((todo) => (
  <TodoItem key={todo.id} ... />  // ✅ Good: unique id
))}
```

**If you used index:**
```tsx
todos.map((todo, index) => (
  <TodoItem key={index} ... />  // ❌ Bad
))
```

**Problem:** If you delete first todo, indexes shift. React thinks it's a different todo, causes bugs.

**In your app:** You correctly use `todo.id` (timestamp), which is unique and stable.

---

### **3. What's JSX? How does it work?**

**Answer:**
JSX is JavaScript XML syntax that looks like HTML but is actually JavaScript. It compiles to `React.createElement()` calls.

**In your code:**
```tsx
<TodoItem
  key={todo.id}
  todo={todo}
  onDelete={onDelete}
  onToggle={onToggle}
  onEdit={onEdit}
/>
```

**Becomes:**
```javascript
React.createElement(TodoItem, {
  key: todo.id,
  todo: todo,
  onDelete: onDelete,
  // ...
})
```

---

### **4. When would you use conditional rendering?**

**Answer:**
Conditional rendering shows/hides content based on state or props.

**In your code:**
```tsx
<button>
  {isEditing ? "Update" : "Add"}  // ✅ Show different text
</button>
```

Also in TodoItem:
```tsx
style={{
  textDecoration: todo.completed ? "line-through" : "none",
  color: todo.completed ? "#888" : "#000",
}}
```

---

## **MEDIUM (Concepts)**

### **5. In your Todo app, where do you store the todos list? Why?**

**Answer:**
In the `useTodos` custom hook: `const [todos, setTodos] = useState<Todo[]>([])`.

**Why there:**
- TodoApp needs access to todos
- TodoList needs to display todos
- TodoItem needs individual todo data
- useTodos is closest to where logic lives
- Keeps TodoApp clean and simple

**Data flow:**
```
useTodos (state lives here)
    ↓
TodoApp (gets todos from hook)
    ↓
TodoList (receives as prop)
    ↓
TodoItem (receives individual todo as prop)
```

---

### **6. How does state lifting work? Show example from your app.**

**Answer:**
State lifting is moving state up to parent component so multiple children can share it.

**In your code:**
```tsx
// useTodos hook (like a parent)
const [todos, setTodos] = useState<Todo[]>([]);

// Children receive data and callbacks
<TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
<TodoInput setInput={setInput} onSubmit={addOrUpdateTodo} />
```

**Why lifted:**
- `TodoList` and `TodoInput` both need `todos` data
- `TodoList` and `TodoItem` both need to modify todos
- Lifting to `useTodos` ensures single source of truth

---

### **7. Why is the input field "controlled"? What happens if it's not?**

**Answer:**
Controlled input means React state controls the input value. `value` and `onChange` keep them in sync.

**In your code:**
```tsx
<input
  value={input}  // ✅ Controlled
  onChange={(e) => setInput(e.target.value)}  // ✅ Updates state
  placeholder="Enter task..."
/>
```

**If uncontrolled:**
```tsx
<input placeholder="Enter task..." />  // ❌ DOM manages value
```

**Problems with uncontrolled:**
- Can't clear input after submit
- Can't pre-fill for editing
- Hard to validate
- Can't control what user types

**Benefits of controlled:**
- Easy to clear: `setInput("")`
- Easy to prefill for editing: `setInput(text)`
- Can validate in real-time

---

### **8. What's component composition? How did you use it in todos?**

**Answer:**
Component composition is building UI from smaller, reusable components instead of one big component.

**In your code:**
```
TodoApp
  ├─ TodoInput (handles input)
  └─ TodoList
      └─ TodoItem (handles individual todo)
```

**Instead of:**
```tsx
// ❌ Bad: Everything in one component
const TodoApp = () => {
  // render input
  // render list
  // render each item
  // 200 lines of code!
}
```

**Benefits:**
- Easy to test each component
- Reusable pieces
- Easier to maintain
- Clear responsibilities

---

### **9. Explain the difference between component state and props.**

**Answer:**
**State:** Owned by component, can change, used for internal data.
**Props:** Passed from parent, read-only, used for configuration.

**In your code:**

| Component | State | Props |
|-----------|-------|-------|
| useTodos | `todos`, `input`, `editingId` | None |
| TodoApp | None | None (uses hook) |
| TodoInput | None | `input`, `setInput`, `onSubmit`, `isEditing` |
| TodoList | None | `todos`, `onDelete`, `onToggle`, `onEdit` |
| TodoItem | None | `todo`, `onDelete`, `onToggle`, `onEdit` |

**Key difference:**
- Component owns state, can change it
- Component receives props, can't change them (immutable)
- To change parent's state, pass callback via props

---

## **HARD (Problem-solving)**

### **10. A bug: clicking delete sometimes deletes wrong todo. What's the issue? How to fix?**

**Answer:**
**Issue:** If you used `index` as key instead of `todo.id`, React can't track which item is which.

**Your code (✅ Correct):**
```tsx
{todos.map((todo) => (
  <TodoItem key={todo.id} ... />  // Uses unique ID
))}
```

**If using index (❌ Bug):**
```tsx
{todos.map((todo, index) => (
  <TodoItem key={index} ... />  // 🐛 Bug!
))}
```

**Example of bug:**
```
Initial: [Task1 (id:1), Task2 (id:2), Task3 (id:3)]
Keys: [0, 1, 2]

Delete Task1:
After: [Task2 (id:2), Task3 (id:3)]
Keys: [0, 1]

React thinks: "Key 0 changed from Task1 to Task2"
Actually: Task1 was deleted, Task2 is still Task2
```

**Fix:**
Use unique, stable IDs (not index). Your code already does this: `id: Date.now()`.

---

### **11. Performance: With 1000 todos, app is slow. Why? How to optimize?**

**Answer:**
**Problem:** Every state change re-renders ALL todos.

**Why slow:**
```tsx
const [todos, setTodos] = useState<Todo[]>([]);  // 1000 items
// Any state change → re-render all 1000 TodoItems
```

**Solutions:**

1. **Virtual scrolling** - Only render visible items
```tsx
// Instead of rendering 1000, render only 50 visible
<VirtualList items={todos} />
```

2. **Memoize TodoItem** - Skip re-render if props unchanged
```tsx
export default React.memo(TodoItem);
```

3. **Separate state** - Edit mode state doesn't touch todos
```tsx
// Your code already does this! ✅
const [editingId, setEditingId] = useState(null);  // Separate
const [todos, setTodos] = useState([]);  // Separate
```

---

### **12. Why is `index` a bad key? Show the problem in your todo app.**

**Answer:**
**Index as key breaks when list order changes.**

**Your app example:**

**Initial state:**
```
todos: [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Build Todo" },
]

keys: [0, 1]
```

**Add todo at beginning (you could add this feature):**
```
todos: [
  { id: 3, text: "New Task" },
  { id: 1, text: "Learn React" },
  { id: 2, text: "Build Todo" },
]

keys: [0, 1, 2]  // Changed!
```

**Problem:** React thinks key 0 is still the first item, but it's a different todo!

**Your code (✅ Correct):**
```tsx
key={todo.id}  // Unique, stable identifier
```

**Key takeaway:** Use unique, stable IDs. Never use index as key.

---

### **13. How would you lift state from TodoItem to TodoList?**

**Answer:**
Moving state up so sibling components can share it.

**Your current structure (state already lifted):**
```tsx
useTodos (state here ✅)
  └─ TodoApp
      ├─ TodoInput (receives: input, setInput)
      └─ TodoList
          └─ TodoItem (receives: todo, callbacks)
```

**Example: If TodoItem had local state (❌ Bad):**
```tsx
const TodoItem = () => {
  const [completed, setCompleted] = useState(false);  // ❌ Local
  // Can't share with sibling TodoItems
}
```

**Lifting to TodoList (✅ Good):**
```tsx
const TodoList = ({ todos, onToggle }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}  // ✅ From parent
        />
      ))}
    </ul>
  );
};
```

**Your code already does this correctly!**

---

### **14. What happens if you mutate state directly? Show bad vs good example.**

**Answer:**
Mutating state directly breaks React's change detection.

**❌ BAD - Direct mutation:**
```tsx
const deleteTodo = (id: number) => {
  const index = todos.findIndex(t => t.id === id);
  todos.splice(index, 1);  // ❌ Mutating!
  setTodos(todos);  // React doesn't detect change
};
```

**✅ GOOD - Immutable (your code):**
```tsx
const deleteTodo = (id: number) => {
  setTodos((prev) => prev.filter((t) => t.id !== id));  // ✅ New array
};
```

**Also immutable - Edit:**
```tsx
setTodos((prev) =>
  prev.map((todo) =>
    todo.id === editingId 
      ? { ...todo, text: input }  // ✅ New object
      : todo
  )
);
```

**Why immutable?**
- React compares old and new state
- If same reference, thinks nothing changed
- Immutable ensures new reference
- Forces React to re-render

---

## **REAL-WORLD**

### **15. How would you persist todos to localStorage?**

**Answer:**
Save todos to localStorage on change, load on app start.

**Implementation:**
```tsx
// Save to localStorage
const addOrUpdateTodo = () => {
  // ... existing logic
  localStorage.setItem('todos', JSON.stringify(todos));  // Save
};

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('todos');
  if (saved) setTodos(JSON.parse(saved));
}, []);
```

**Better approach:** Save after every state change
```tsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);  // Save whenever todos change
```

---

### **16. How would you add edit functionality to todos?**

**Answer:**
You already implemented this! 🎉

**Your implementation:**
1. **Track editing state:** `const [editingId, setEditingId] = useState(null);`
2. **Load todo text into input:** 
```tsx
const editTodo = (id: number, text: string) => {
  setInput(text);  // Pre-fill input
  setEditingId(id);  // Mark as editing
};
```
3. **Update or create:**
```tsx
if (editingId !== null) {
  // Update existing
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === editingId ? { ...todo, text: input } : todo
    )
  );
  setEditingId(null);
} else {
  // Add new
  setTodos((prev) => [...prev, { id: Date.now(), text: input, completed: false }]);
}
```
4. **Button changes text:** `{isEditing ? "Update" : "Add"}`

---

### **17. What if you need to share todos between multiple pages?**

**Answer:**
Move state management outside components using one of these approaches:

**Option 1: Context API** (similar to your hook)
```tsx
const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const { todos, addTodo, deleteTodo } = useTodos();
  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// Use on any page:
const useTodoContext = () => useContext(TodoContext);
```

**Option 2: Global state management** (Redux, Zustand)
```tsx
const todoStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
}));

// Use anywhere:
const todos = todoStore((state) => state.todos);
```

**Option 3: What you already have** (custom hook)
Your `useTodos` hook is perfect for single app. For multiple pages/components, wrap in Context or use state management library.

**In your current app:**
```tsx
<TodoApp />  // Uses useTodos hook
// Works great for single page!
```

---

## **QUICK REFERENCE TABLE**

| Concept | Your Implementation | Location |
|---------|-------------------|----------|
| **State** | todos, input, editingId | useTodos hook |
| **Props** | Passed to TodoInput, TodoList, TodoItem | Each component |
| **Keys** | `key={todo.id}` | TodoList map |
| **Controlled Input** | `value={input} onChange={...}` | TodoInput |
| **Callbacks** | onDelete, onToggle, onEdit | Props drilling |
| **Composition** | TodoApp → TodoList → TodoItem | File structure |
| **Lifting State** | useTodos hook | hooks/useTodos.ts |
| **Immutable Updates** | Spread operator, map(), filter() | useTodos functions |
| **Edit Feature** | editingId + addOrUpdateTodo | ✅ Already done |

---

## **INTERVIEW TIPS**

1. **Mention your code:** "In my TodoApp, I use..." instead of generic examples
2. **Show file structure:** "I have useTodos hook where state lives"
3. **Explain decisions:** "I use todo.id as key because it's unique and stable"
4. **Point to patterns:** "I lift state to hook so TodoList and TodoInput can share"
5. **Acknowledge features:** "I already implemented edit functionality by tracking editingId"

---

**Print this and practice answering out loud! 🎤**
