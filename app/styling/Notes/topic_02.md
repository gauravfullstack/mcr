## 1. Flexbox

Flexbox is for laying out items **in a single direction** — a row or a column — and distributing space between/around them. Think of it as "arrange these items in a line, and control how they share space."

**Container properties** (go on the parent):
```css
.container {
  display: flex;
  flex-direction: row;         /* row (default) | column */
  justify-content: center;     /* alignment along main axis: flex-start | center | space-between | space-around */
  align-items: center;         /* alignment along cross axis: flex-start | center | stretch */
  gap: 16px;                   /* spacing between items */
  flex-wrap: wrap;             /* allow items to wrap to next line */
}
```

**Item properties** (go on the children):
```css
.item {
  flex: 1;          /* grow to fill available space, shorthand for flex-grow/shrink/basis */
  flex-shrink: 0;   /* don't shrink this item */
}
```

Mental model that helps in interviews: **main axis vs cross axis**. `flex-direction: row` → main axis is horizontal, `justify-content` controls that. `align-items` always controls the *cross* axis (perpendicular). If you flip to `column`, the axes flip too.

**When to use it:** navbars, button groups, centering a single item, any 1-dimensional layout (one row OR one column at a time).

**Interview-ready:** *"Flexbox lays out items along a single axis — row or column — and I use it for one-dimensional layouts like navbars or centering content. `justify-content` aligns along the main axis, `align-items` aligns along the cross axis, and they flip meaning if you switch `flex-direction`."*

---

## 2. Grid

Grid is for laying out items in **two dimensions at once** — rows AND columns together. Think of it as "define a grid structure, and place items into cells of that structure."

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 equal columns */
  grid-template-rows: auto 1fr auto;       /* header / content / footer sizing */
  gap: 16px;
}

.item {
  grid-column: 1 / 3;   /* span from column line 1 to 3 (spans 2 columns) */
}
```

`fr` unit is Grid-specific — means "a fraction of available space." `1fr 2fr` = second column gets twice the space of the first.

**When Grid beats Flexbox (the classic framing they want):**
- **Flexbox = 1D** — you're arranging items in a single line, and wrapping is more of a side-effect than a plan.
- **Grid = 2D** — you actually care about rows AND columns simultaneously, like a dashboard layout, image gallery, or page layout with header/sidebar/content/footer.

Simple test: **if you're thinking about "columns AND rows" as a real structure → Grid. If you're just lining things up in one direction → Flexbox.**

**Interview-ready:** *"Grid handles two-dimensional layouts — rows and columns together — while Flexbox is one-dimensional. I'd reach for Grid when the layout genuinely has a row/column structure, like a dashboard or page layout with header/sidebar/footer, and Flexbox for simpler single-direction arrangements like a toolbar or centering an item."*

---

## 3. Box Model — `content-box` vs `border-box`

Every element is a box made of: **content → padding → border → margin** (in that order, working outward).

The question is: **when you set `width: 200px`, what does that 200px actually measure?**

- **`content-box`** (default) — `width` = content only. Padding and border get **added on top**, so the actual rendered box is bigger than 200px.
- **`border-box`** — `width` = content + padding + border combined. So the box is exactly 200px total, and padding/border eat into that space instead of adding to it.

```css
.box {
  box-sizing: content-box;  /* default — width excludes padding/border */
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* actual rendered width = 200 + 20*2 + 5*2 = 250px */
}

.box2 {
  box-sizing: border-box;   /* width includes padding/border */
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* actual rendered width = exactly 200px */
}
```

**Why `border-box` is the standard choice:** with `content-box`, adding padding unexpectedly grows your element and breaks layouts — you constantly have to do math to compensate. `border-box` makes `width` mean what you'd intuitively expect it to mean. That's why almost every modern reset/framework (including Tailwind) sets `* { box-sizing: border-box; }` globally.

**Interview-ready:** *"By default, `width` only accounts for content — padding and border add on top, which makes sizing unpredictable. `box-sizing: border-box` makes `width` include padding and border, so the box stays exactly the size you set. That's why it's the standard reset almost every project applies globally — it makes layout math predictable."*

---

## 4. Positioning — relative / absolute / fixed / sticky

## CSS Positioning — Short Summary

CSS positioning controls **where an element is placed** on a webpage.

### 1. `position: relative`

The element **stays in its normal position**, but you can move it using `top`, `left`, etc.

```css
.box {
    position: relative;
    top: 10px;
    left: 20px;
}
```

👉 Think: **"Move me slightly from my normal position."**

---

### 2. `position: absolute`

The element is **removed from the normal flow** and positioned relative to its nearest positioned parent.

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 10px;
    right: 10px;
}
```

👉 Think: **"Place me exactly inside my parent."**

---

### 3. `position: fixed`

The element is positioned relative to the **browser screen (viewport)** and stays there even when you scroll.

```css
.button {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```

👉 Think: **"Keep me fixed on the screen."**

---

### 4. `position: sticky`

The element behaves normally while scrolling, but **sticks to a specified position** when it reaches it.

```css
.header {
    position: sticky;
    top: 0;
}
```

👉 Think: **"Scroll normally, then stick me at the top."**

---


---

## 5. Specificity & Cascade

When multiple CSS rules target the same element, the browser needs to decide which one wins. Two factors: **specificity** (how "targeted" a selector is) and **source order** (later rules win if specificity ties).

**Specificity hierarchy (highest to lowest):**
1. Inline styles (`style="..."`) — wins almost always
2. IDs (`#header`)
3. Classes, attributes, pseudo-classes (`.btn`, `[type="text"]`, `:hover`)
4. Elements, pseudo-elements (`div`, `::before`)

```css
div { color: blue; }              /* specificity: 0-0-1 */
.text { color: red; }             /* specificity: 0-1-0 — wins over above */
#main .text { color: green; }     /* specificity: 1-1-0 — wins over above */
```

The practical use of this: **"why isn't my style applying?"** is almost always either (a) something more specific is overriding it, or (b) it's later in source order at equal specificity, or (c) `!important` somewhere (which you should basically never use, but good to know it overrides everything except inline + more `!important`).

**Interview-ready:** *"When rules conflict, the browser picks based on specificity first — inline styles beat IDs, which beat classes/attributes/pseudo-classes, which beat element selectors. If specificity is equal, the rule declared later in the source wins. When a style 'isn't applying,' it's almost always a more specific selector, later source order, or a stray `!important` overriding it — that's usually where I start debugging."*

---
