
```markdown
Functional Requirements:

1. There will be three columns - Todo, In-Progress and Completed.
2. Each column has title, count, cards and an input box 
   to add new cards.
3. Each card has left/right buttons to move to another column.
4. Add validation on left/right buttons according to column position.
5. If no card present in any column, show "No Cards" text.
6. On clicking left/right button, card removes from current 
   column and adds to target column.



Data Model:

1. Status = 'todo' | 'inprogress' | 'completed'

2. Card = {
     id: string,
     title: string,
     status: Status
   }

3. Column = {
     id: Status,
     title: string,
     cards: Card[]
   }



High Level Design:

app
  kanban-board
    components
      Column.tsx        → single column UI + input box
      KanbanCard.tsx    → single card UI + move buttons
    data
      initialColumns.ts → starting data for all 3 columns
    hooks
      useKanbanBoard.ts → all logic here
    types
      index.ts
    page.tsx



Business Logic:

1. State — single `columns` array in useKanbanBoard.ts
   manages all columns and their cards together.

2. addCard(columnId, title)
   - Validate: if title is empty → return early
   - Create new card: { id: crypto.randomUUID(), title, status: columnId }
   - Find target column → spread new card into its cards array
   - Immutable update using .map()

3. moveCard(cardId, direction: 'left' | 'right')
   - Find current column index using .findIndex()
   - Calculate target index: direction === 'left' ? index - 1 : index + 1
   - Guard: if target < 0 or >= columns.length → return early
   - Remove card from current column using .filter()
   - Update card status to match target column id
   - Add card to target column using spread
   - All in single immutable .map() update

4. Left button disabled when card is in first column (index === 0)
   Right button disabled when card is in last column (index === columns.length - 1)

5. Empty state — if column.cards.length === 0 → show "No Cards"

6. Each column manages its own input state
   locally inside Column.tsx — not in the hook
```

---

## What to say in interview

> *"I'm keeping all state in a single `columns` array —
> moving a card is just removing from one column's cards array
> and adding to another's.
> Column component stays dumb — only logic lives in the hook."*

---
