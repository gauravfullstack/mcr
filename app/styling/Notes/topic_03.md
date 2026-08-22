Let's finish up with **Phase 3 — Practical/Scenario Questions**.

## 1. Center a Div (multiple ways)

This is a classic "show me you know your options" question. Know 3-4 ways and *when* you'd pick each.

**Flexbox (most common, works for any content):**
```css
.parent {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;      /* vertical */
}
```

**Grid (shortest to write):**
```css
.parent {
  display: grid;
  place-items: center;  /* centers both axes in one line */
}
```

**Absolute + transform (when you can't touch the parent's display, e.g. centering over other content):**
```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Margin auto (horizontal-only, old-school, needs a fixed width):**
```css
.child {
  width: 200px;
  margin: 0 auto;
}
```

**Interview-ready:** *"My default is Flexbox — `justify-content: center` + `align-items: center` on the parent, works regardless of content size. Grid's `place-items: center` is even shorter if I'm already using Grid. For overlay-style centering, like a modal over a page, I'd use `position: absolute` with `top/left: 50%` and `transform: translate(-50%, -50%)`, since it doesn't depend on the parent's layout mode."*

---

## 2. Responsive Design — media queries vs fluid units, mobile-first

Two complementary approaches, not competing ones:

**Media queries** — apply different CSS rules at different viewport widths. Good for *structural* changes (layout switching from row to column, hiding/showing elements).
```css
.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

**Fluid/relative units** — instead of fixed breakpoints, sizes scale naturally with the viewport or parent, so you need *fewer* breakpoints in the first place.
```css
.text {
  font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem);  /* scales smoothly between min and max */
}
.box {
  width: 90%;      /* relative to parent, not a fixed px */
  max-width: 600px;
}
```

**Mobile-first reasoning:** write your base CSS for the smallest screen first, then use `min-width` media queries to add complexity as the screen grows — rather than starting from desktop and using `max-width` to strip things down. Why: mobile is usually the more constrained, simpler layout, so it makes sense as the baseline; you're progressively *enhancing*, not desperately *undoing* desktop styles for small screens.

**Interview-ready:** *"I use fluid/relative units — percentages, `rem`, `clamp()` — so things scale naturally and need fewer breakpoints. On top of that, media queries handle structural shifts, like flex-direction changing from column to row. I write mobile-first: base styles target the smallest screen, then `min-width` queries progressively add complexity for larger screens, rather than starting desktop-first and stripping things down."*

---
# CSS Types — Short Summary

### 1. SCSS / Sass

SCSS is an **extension of CSS** that provides extra features such as variables, nesting, mixins, and functions.

```scss
$primary: blue;

.button {
    background: $primary;

    &:hover {
        background: darkblue;
    }
}
```

SCSS is compiled into regular CSS before the browser uses it.

**Think:**

> **SCSS = CSS with extra features.**

---

### 2. CSS Modules

CSS Modules make CSS **scoped to a particular component**, preventing class-name conflicts.

```css
/* Button.module.css */
.button {
    background: blue;
    color: white;
}
```

```jsx
import styles from "./Button.module.css";

<button className={styles.button}>Click</button>
```

The `.button` class is effectively made unique to that component.

**Think:**

> **CSS Modules = CSS scoped to a component.**

---

### 3. CSS-in-JS

CSS-in-JS means writing/managing styles **inside JavaScript or JavaScript-based components**.

Example:

```jsx
const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px"
};

<button style={buttonStyle}>Click</button>
```

---
