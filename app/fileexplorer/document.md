
```markdown
Functional Requirements:

1. Display a nested file/folder tree structure.
2. Each folder can be expanded or collapsed on click.
3. Folders show 📁 when closed and 📂 when open.
4. Files show 📄 icon — clicking them does nothing.
5. Each node shows its name.
6. Tree can be nested to any depth.



Data Model:

1. TreeNode = { id: string, name: string, children?: TreeNode[] }
2. If children exists → it's a folder
3. If children is undefined → it's a file



High Level Design:

app
  file-explorer
    components
      TreeNode.tsx      → recursive component
    data
      initialData.ts    → nested tree structure
    types
      index.ts
    page.tsx



Business Logic:

1. Each TreeNode component manages its own
   local isOpen state — independent of other nodes.

2. isFolder check:
   - children !== undefined → folder
   - children === undefined → file

3. onClick on a row:
   - if folder → toggle isOpen
   - if file → do nothing

4. Recursion:
   - TreeNode renders itself for each child
   - Works for any depth automatically

5. Render children only when:
   - isFolder === true AND isOpen === true

6. page.tsx maps over root nodes
   and renders TreeNode for each
```

---

## What to say in interview

> *"The key insight is that each TreeNode
> manages its own isOpen state independently —
> so opening one folder never affects others.
> Recursion handles any depth automatically —
> same component, same logic, infinite nesting."*

---