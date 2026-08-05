# 🎯 Machine Coding Round — Universal Template

> Use this template for every MCR problem in every interview.
> Same structure. Every time. No exceptions.

---

## ⏱️ Time Split (45 min interview)

| Time | Activity |
|---|---|
| 2 min | Clarify requirements |
| 3 min | Think out loud |
| 5 min | Plan on paper |
| 30 min | Code |
| 5 min | Review + Edge cases |

---

## Step 1: Clarifying Requirements

> 💬 Say: *"I'd like to clarify a few things before I proceed…"*

### Functional Requirements
Write these clearly before coding:
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

### Smart Questions to Ask
- Should data persist after refresh? (local state vs API)
- Real API or mock data?
- Any validation needed? (empty input, max length)
- [ ] Problem specific question
- [ ] Problem specific question

> 👉 Even if interviewer says "keep it simple" — you've shown **product thinking.**

---

## Step 2: Data Model

> 💬 Say: *"I'll use a unique id instead of index to avoid bugs during delete/update operations."*

```ts
type [Name] = {
  id: string;       // always unique id — never index
  field1: string;
  field2: boolean;
}
```

> 💡 This step alone signals maturity. Most juniors skip it.

---

## Step 3: Component Design

> 💬 Say: *"I'll keep state lifted at the top for single source of truth."*

### Component Tree
```
[AppComponent]
 ├── [Component1]      → responsibility
 ├── [Component2]      → responsibility
      └── [Component3] → responsibility
```

### Folder Structure
```
src/
├── types/
│   └── index.ts          → all TypeScript types
├── data/
│   └── [name].ts         → mock data if needed
├── hooks/
│   └── use[Name].ts      → all logic here
├── components/
│   ├── [Component1].tsx
│   └── [Component2].tsx
└── App.tsx               → wire everything together
```

### Component Responsibilities
| Component | Responsibility |
|---|---|
| App.tsx | Holds state, connects everything |
| [Component1] | Description |
| [Component2] | Description |

---

## Step 4: State Design

> 💬 Say: *"I'll update state immutably to ensure React re-renders properly."*

```ts
// inside custom hook
const [items, setItems] = useState<[Type][]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

> 💡 Never store what you can calculate — use derived values instead.
```ts
// derived — don't store in state
const total = items.reduce((sum, item) => sum + item.value, 0);
```

---

## Step 5: Core Operations

> 💬 Say: *"All operations will be pure — immutable updates using map/filter."*

```ts
// Add
function add[Item](params: type): void {
  // 1. validate
  // 2. create new item
  // 3. update state immutably → spread
}

// Remove
function remove[Item](id: string): void {
  // filter out item → never splice
}

// Update
function update[Item](id: string, data: type): void {
  // map + update matching item → spread
}
```

---

## Step 6: UI Behavior Plan

Describe interactions before coding:

- [ ] Input box + button → triggers add action
- [ ] List renders using `.map()` with unique `key`
- [ ] [Interaction] → [what happens]
- [ ] [Interaction] → [what happens]

---

## Step 7: Edge Cases

> 💬 Say: *"Let me think about edge cases before I start coding…"*

| Edge Case | How to Handle |
|---|---|
| Empty input | `if (!input.trim()) return` |
| No data state | Show empty message |
| [Specific case] | [Solution] |
| [Specific case] | [Solution] |

> 👉 Bringing up edge cases yourself = senior signal.

---

## Step 10: Transition to Code

> 💬 Say: *"I'll start with types → hook → small components → App.
> I'll prioritize correctness and readability first, then optimize if needed."*

### Coding Order — Always follow this
```
1. types/index.ts          → define data shapes first
2. data/[name].ts          → mock data if needed
3. hooks/use[Name].ts      → all logic
4. Small components        → dumb UI components
5. App.tsx                 → wire everything together last
```

> 💡 Dependencies first, consumer last. This is how senior devs think.

---


*Template by Gaurav — React MCR Prep 2024*

---