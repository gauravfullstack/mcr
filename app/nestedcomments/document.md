```markdown
Functional Requirements:

1. Display a list of comments in a nested tree structure.
2. Each comment shows author name and comment text.
3. User can reply to any comment at any depth.
4. Clicking Reply shows an input box below that comment.
5. Submitted reply appears nested under its parent comment.
6. If no replies, nothing extra is shown below the comment.



Data Model:

1. Comment = {
     id: string,
     author: string,
     text: string,
     replies: Comment[]   → recursion lives here
   }



High Level Design:

app
  comments
    components
      CommentNode.tsx    → recursive component
                           handles single comment + its replies
      CommentTree.tsx    → manages state + renders root comments
    data
      initialData.ts     → starting comments with nested replies
    types
      index.ts
    page.tsx



Business Logic:

1. State — single `comments` array in CommentTree.tsx
   manages all comments and their nested replies together.

2. handleReply(parentId, text)
   - Validate: if text is empty → return early
   - Create new reply: { id: crypto.randomUUID(), author: 'You', text, replies: [] }
   - Call addReplyToComment() to find correct parent and add reply

3. addReplyToComment(comments, parentId, newReply)
   - Recursive function — traverses entire tree
   - If comment.id === parentId → add reply to its replies array
   - If not → go deeper into comment.replies
   - Immutable update using .map() at every level

4. Recursion in UI
   - CommentNode renders itself for each reply
   - Works for any depth automatically

5. Reply toggle
   - Each CommentNode manages its own local showReply state
   - Clicking Reply → shows input box
   - Clicking Cancel → hides input box

6. After reply submitted
   - Clear input text
   - Hide reply input box
```

---

## What to say in interview

> *"Two levels of recursion here —
> CommentNode renders itself for each reply in UI.
> addReplyToComment traverses the tree recursively
> to find the correct parent and add reply there.
> State lives at top in CommentTree — single source of truth."*

---