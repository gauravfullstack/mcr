Let's start **Phase 4 — HTML/CSS Medium-Depth + Practical Gotchas**.

## 1. Specificity Edge Cases — why a style silently loses

You already know the hierarchy (inline > ID > class > element). The "medium" version interviewers actually probe is: **combined selectors and `!important` interactions.**

**Combined selectors stack specificity — they don't reset it:**
```css
.card .title { color: blue; }        /* 0-2-0 (two classes) */
#sidebar .title { color: red; }      /* 1-1-0 (one ID + one class) — wins, ID always beats any number of classes */
```

**`!important` beats specificity entirely** — it's a separate, higher tier. Two `!important` rules on the same property still fall back to specificity between themselves.
```css
.title { color: blue !important; }
#sidebar .title { color: red; }   /* loses — !important always wins regardless of specificity below it */
```

**The real-world trap:** you write a scoped, specific style, but a global reset or a third-party library CSS (loaded later, or using `!important`) silently overrides it. First things to check when a style "isn't applying": (1) is something more specific targeting it, (2) is it later in source order at equal specificity, (3) is there a stray `!important` somewhere — often in a library's default CSS.

**Interview-ready:** *"Specificity is additive across combined selectors — an ID always beats any number of classes, no matter how many are chained. `!important` sits above the entire specificity hierarchy and only loses to another `!important` with higher specificity, or an inline style. When debugging a style that 'isn't applying,' I check those three things in order: a more specific selector, later source order at equal specificity, or a stray `!important` — often coming from a library's default styles."*

---

## 2. Stacking Context & `z-index` — the classic "why isn't z-index working" bug

The trap that gets almost everyone: **`z-index` only works when elements are competing within the *same stacking context*.** If two elements are in different stacking contexts, their `z-index` values aren't compared directly — the parent context's stacking order wins first.

```html
<div class="parent-a" style="position: relative; z-index: 1;">
  <div style="position: absolute; z-index: 9999;">A (inside parent-a)</div>
</div>
<div class="parent-b" style="position: relative; z-index: 2;">
  <div style="position: absolute; z-index: 1;">B (inside parent-b)</div>
</div>
```
Here, **B always renders above A**, even though A's child has `z-index: 9999`. Why? Because `parent-a` (z-index: 1) and `parent-b` (z-index: 2) are competing stacking contexts — parent-b wins that competition first, so *everything* inside it stacks above *everything* inside parent-a, regardless of the huge `z-index: 9999` buried inside A.

**What creates a new stacking context** (the common ones worth knowing): `position` (relative/absolute/fixed/sticky) + a `z-index` value other than `auto`, `opacity < 1`, `transform`, `filter`.

**Interview-ready:** *"`z-index` only compares elements within the same stacking context — it's not a global scale. Elements like `position` + non-auto `z-index`, `opacity` less than 1, or `transform` create new stacking contexts. So a deeply nested element with `z-index: 9999` can still render below something else if its parent's stacking context itself has a lower `z-index` than a competing context — the parent competition resolves first. This is usually the actual cause when 'z-index isn't working' despite a huge number."*

---

## 3. Collapsing Margins & `overflow` Clipping Gotchas

**Margin collapsing** — when two **vertical** margins meet (adjacent siblings, or a parent/first-child with no separating border/padding), they don't add — the **larger one wins**, not the sum.

```css
.box-a { margin-bottom: 20px; }
.box-b { margin-top: 30px; }
/* gap between them is 30px, NOT 50px — margins collapse to the larger value */
```

This also happens between a parent and its first/last child if there's no padding/border/inline content separating them — the child's margin can "escape" and apply to the parent instead, which is a common layout confusion.

**Fix/prevention:** use `padding` instead of margin where collapsing is a problem, or give the parent `overflow: hidden` / a border / padding to establish a boundary that stops the collapse.

**`overflow` clipping gotcha:** setting `overflow: hidden` to clip content also **clips things you didn't intend to hide** — like a dropdown, tooltip, or `box-shadow` that's meant to extend outside the container. This is a very common real bug: "why is my dropdown getting cut off" → parent has `overflow: hidden` (often set for a completely unrelated reason, like clipping an image).

**Interview-ready:** *"Vertical margins between adjacent elements collapse to the larger value instead of summing — that's margin collapsing, and it can even let a child's margin escape onto its parent if there's no border/padding separating them. Separately, `overflow: hidden` clips *everything* that overflows the box, including things you want visible like dropdowns or shadows — that's usually the cause when a tooltip or dropdown gets mysteriously cut off, and I'd check for an `overflow: hidden` on an ancestor first."*

---

## 4. Practical Build — Responsive Card

Quick, minimal, demonstrates the concepts together (flex, box-sizing, responsive units):

```tsx
function Card({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg max-w-md">
      <img src={imageUrl} alt={title} className="w-full sm:w-24 h-24 object-cover rounded" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
```
Key idea to say out loud in an interview: **stacks vertically on mobile (`flex-col`), switches to horizontal on `sm:` breakpoint (`sm:flex-row`)** — that's the mobile-first reasoning from Phase 3 applied directly.

---

## 5. Practical Build — Form Layout (label/input/error)

```tsx
function FormField({ label, error, ...inputProps }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.id} className="text-sm font-medium">{label}</label>
      <input
        {...inputProps}
        className={`border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// usage
<FormField id="email" label="Email" type="email" error={errors.email} />
```
Ties back to accessibility (Phase 1) — `label` + `htmlFor`/`id` pairing — plus a conditional error state, which is the realistic MCR pattern.

---

## 6. Practical Build — 2-Column Responsive Layout (no media query pile-up)

Using Grid's `auto-fit`/`minmax` so it responds without writing explicit breakpoints:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
```
This single line auto-adjusts column count based on available width — no media queries needed. Worth mentioning as a "smarter" responsive technique when asked.

**Interview-ready:** *"For simple responsive grids, I'd use `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` instead of writing multiple media query breakpoints — it lets the browser fit as many columns as possible while respecting a minimum item width, so it responds fluidly without manual breakpoints."*

---

That's Phase 4 done. Ready for **Phase 5 — ShadCN/MUI (conceptual + manual-validation form/table/modal builds)**, or want a quick check-in on Phase 4 first?
