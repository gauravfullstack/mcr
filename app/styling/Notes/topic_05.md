Let's do **Phase 5 — Component Libraries (ShadCN/MUI)**.

## 1. Conceptual — When to Use a Component Library vs Build Custom

The real question interviewers are probing: **do you understand the trade-off, not just "I use ShadCN because it's popular."**

**Arguments for a component library (ShadCN/MUI):**
- **Accessibility out of the box** — proper `aria-*` attributes, keyboard navigation (Tab/Escape/Arrow keys), focus trapping in modals — things that are easy to get subtly wrong building from scratch.
- **Speed** — don't reinvent a dropdown/modal/date-picker; ship faster.
- **Consistency** — shared design tokens/variants across a team, less drift.

**Arguments for building custom:**
- **Bundle size / control** — MUI in particular ships a lot; ShadCN is actually different here (see below).
- **Customization ceiling** — deeply overriding a library's internal styles can get messy, especially with MUI's CSS-in-JS approach fighting Tailwind.
- **No lock-in** — full control over behavior for very specific/unusual UX.

**Worth knowing — ShadCN is architecturally different from MUI**, and this is a good detail to drop in an interview: ShadCN isn't an installed npm dependency — it's copy-paste. The CLI generates the actual component **source code** into your repo (built on Radix UI primitives for accessibility + Tailwind for styling). So you get accessibility out of the box (from Radix) but you *own and can edit* the code directly — no fighting a black-box library's override system. MUI, by contrast, is a traditional installed dependency with its own theming system and CSS-in-JS (emotion) under the hood.

**Interview-ready:** *"I'd reach for a component library when accessibility and speed matter more than pixel-level control — things like keyboard navigation and focus management in a modal are easy to get subtly wrong from scratch. I use ShadCN at work: it's not an installed dependency like MUI, it's a CLI that copies component source — built on Radix primitives for accessibility, styled with Tailwind — directly into the repo. So I get accessibility out of the box but still own and can fully customize the code, without fighting a library's override system the way you sometimes do with MUI's CSS-in-JS theming."*

---

## 2. Practical Build — Form with ShadCN (manual `useState`, no RHF/zod)

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function SignupForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!values.email.includes("@")) newErrors.email = "Invalid email";
    if (values.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("submitting", values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      <Button type="submit">Sign up</Button>
    </form>
  );
}
```
Notice: this is exactly your Phase 4 `FormField` pattern (label + input + error), just swapping raw `<input>` for ShadCN's `<Input>`/`<Label>`/`<Button>` — the manual state/validation logic doesn't change at all. That consistency is the point — worth saying out loud if asked "how does using ShadCN change your form logic": **it doesn't; it only changes the rendered markup/styling layer.**

---

## 3. Practical Build — Table with ShadCN (data table pattern)

For MCR purposes, keep this to the **static/manual pattern** — map over data, no need for the full `@tanstack/react-table` integration (that's overkill for a machine coding round; mention you're aware it exists for large datasets with sorting/filtering/pagination, but a plain map is the expected MCR answer).

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```
**Interview-ready:** *"For a straightforward table, I'd map the data directly into ShadCN's `Table` components — it's just semantic table markup (`<table>`, `<thead>`, `<tbody>`) with Tailwind styling underneath, no special data logic involved. If the requirement grows to sorting/filtering/pagination on a large dataset, that's when I'd reach for something like TanStack Table, which ShadCN's docs actually recommend pairing with it — but for MCR scope, a plain `.map()` over rows is the right level."*

---

## 4. Practical Build — Modal/Dialog with ShadCN

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function ConfirmDeleteModal({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600">This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => { onConfirm(); setOpen(false); }}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```
The thing worth calling out here explicitly, since it ties back to your earlier "why use a library" answer: **`Dialog` is built on Radix's dialog primitive**, which handles focus trapping (Tab cycles only within the modal), closing on `Escape`, and closing on outside-click — all for free. If asked "how would you build a modal from scratch," you'd need to manually implement all three of those, plus a portal to render outside the normal DOM tree — that's the real value-add being demonstrated here.

**Interview-ready:** *"For a modal, ShadCN's `Dialog` (Radix underneath) gives me focus trapping, Escape-to-close, and outside-click-to-close automatically — things I'd otherwise have to hand-build with a portal and manual keyboard event handling. I control open/close state myself via `open`/`onOpenChange`, same as any controlled component, so integrating it into a delete-confirmation flow is just normal React state management around ShadCN's primitives."*

---

That's Phase 5 done — HTML/CSS deep-dive (Phase 4) and ShadCN/MUI (Phase 5) both complete, staying consistent with your manual-validation decision throughout.

Want a mixed quiz across Phase 4+5 to check retention, or should I go update your job search tracking to reflect the expanded syllabus?
