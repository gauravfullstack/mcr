## 1. Semantic HTML — `<section>`, `<article>`, `<nav>`, `<header>` vs `<div>`

The core idea: semantic tags tell the browser (and other tools) **what the content means**, not just how to box it. A `<div>` is a meaningless container — it says nothing about what's inside. `<nav>` says "this is navigation," `<header>` says "this is introductory content," etc.

```html
<!-- Non-semantic — works visually, but meaningless structurally -->
<div class="nav">...</div>
<div class="article">...</div>

<!-- Semantic — same visual result, but conveys meaning -->
<nav>...</nav>
<article>...</article>
```

Quick definitions so you don't blank on these:
- `<header>` — intro/top content of a page or a section (not always THE page header — can be per-section too)
- `<nav>` — navigation links
- `<article>` — self-contained, independently distributable content (a blog post, a card that makes sense on its own)
- `<section>` — a thematic grouping of content, usually with a heading

**Why it matters (this is what they're really testing):**
1. **Accessibility** — screen readers use these tags to let users jump directly to "navigation" or "main content" instead of reading everything linearly.
2. **SEO** — search engines weigh content inside `<article>`/`<section>` differently than a generic `<div>`; it helps them understand page structure.

**Interview-ready:** *"Semantic tags describe the meaning of content, not just its styling — `<nav>` for navigation, `<article>` for standalone content, `<section>` for thematic grouping. I use them over `<div>` because screen readers rely on them for navigation landmarks, and search engines use them to better understand page structure for SEO. A `<div>` conveys zero information beyond 'there's a box here.'"*

---

## 2. `<script>` vs `<script async>` vs `<script defer>`

The difference between `<script>`, `<script async>`, and `<script defer>` is mainly about **when the browser downloads the JavaScript and when it executes it relative to HTML parsing**.

The easiest way to understand them is to imagine the browser reading your HTML **from top to bottom**.

---

## 1. Normal `<script>`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>

    <script src="app.js"></script>
</head>
<body>
    <h1>Hello</h1>
    <p>This is my page.</p>
</body>
</html>
```

When the browser reaches:

```html
<script src="app.js"></script>
```

the browser generally does this:

```text
HTML parsing
     ↓
Find <script>
     ↓
STOP parsing HTML
     ↓
Download app.js
     ↓
Execute app.js
     ↓
Continue parsing HTML
     ↓
<h1>Hello</h1>
<p>...</p>
```

### Important consequence

The HTML parser is **blocked** while the script is being downloaded and executed.

For example:

```html
<script src="app.js"></script>

<h1>Hello</h1>
```

If `app.js` takes 3 seconds to download:

```text
0s       Browser starts parsing
         ↓
         <script> found
         ↓
0-3s     Download app.js
         ↓
3s       Execute app.js
         ↓
3s+      Continue parsing
         ↓
         <h1>Hello</h1>
```

So the user may have to wait before the rest of the page can be parsed.

---

# 2. `<script async>`

```html
<script async src="app.js"></script>
```

With `async`, the browser **downloads the JavaScript while continuing to parse the HTML**.

```text
HTML parsing ───────────────────────────────→
       ↓
   Find async script
       │
       └──── Download app.js
                    ↓
               Download complete
                    ↓
               Execute script
```

The important part is that **HTML parsing doesn't have to wait for the download**.

For example:

```html
<script async src="analytics.js"></script>

<h1>Hello</h1>
<p>Welcome to my website.</p>
<button>Click me</button>
```

The browser can do something like:

```text
HTML parsing ──────────────────────────────→
       │              │             │
       │              │             │
       ↓              ↓             ↓
    <h1>          <p>Welcome</p>   <button>
       │
       └── Download analytics.js
                    ↓
              Execute whenever
              download finishes
```

### The key characteristic of `async`

**Execution order is not guaranteed.**

Suppose you have:

```html
<script async src="one.js"></script>
<script async src="two.js"></script>
```

You might expect:

```text
one.js
  ↓
two.js
```

But that's **not guaranteed**.

If `two.js` downloads faster:

```text
Download one.js ────────────────→
Download two.js ─────→ Execute two.js
                         ↓
                  Execute one.js
```

So:

```text
two.js
one.js
```

could execute in that order.

### When is `async` useful?

It's good for scripts that are **independent of the page and independent of other scripts**.

For example:

* Analytics
* Ads
* Tracking scripts
* Some third-party widgets

If an analytics script executes slightly earlier or later, your application usually doesn't depend on that ordering.

---

# 3. `<script defer>`

```html
<script defer src="app.js"></script>
```

`defer` also allows the browser to **download the script while parsing HTML**.

But there's an important difference:

> A deferred script waits until HTML parsing is finished before executing.

Conceptually:

```text
HTML parsing ───────────────────────────→ Finished
       │             │
       │             │
       ↓             ↓
   Download       Download
    script         complete
                      │
                      ↓
               HTML parsing finishes
                      │
                      ↓
               Execute script
```

---

## 3. `localStorage` vs `sessionStorage` vs `cookies`

The differences that actually matter: **persistence, size, and whether the server can see them.**

| | Persistence | Size | Sent to server? |
|---|---|---|---|
| `localStorage` | Until manually cleared | ~5-10MB | No |
| `sessionStorage` | Cleared when tab closes | ~5-10MB | No |
| `cookies` | Configurable expiry | ~4KB | Yes, sent with every HTTP request automatically |

**Use cases:**
- `localStorage` — persistent client-side data that doesn't need to touch the server: theme preference, cached non-sensitive data.
- `sessionStorage` — data scoped to one tab/session: form draft data, wizard step state.
- `cookies` — anything the **server needs to read**, especially auth (since they're auto-attached to requests). Also the only option with `httpOnly` (JS can't touch it — safer against XSS).

**Security implication that comes up a lot:** storing auth tokens in `localStorage` is vulnerable to **XSS** (any injected script can read it). `httpOnly` cookies are safer for tokens because JavaScript literally cannot access them — only the browser sends them automatically.

**Interview-ready:** *"`localStorage` persists indefinitely, `sessionStorage` clears when the tab closes, both stay client-side and aren't sent to the server. Cookies are small, sent automatically with every request, and support an `httpOnly` flag that blocks JS access — which is why I'd store auth tokens in an `httpOnly` cookie rather than `localStorage`, since `localStorage` is readable by any injected script and vulnerable to XSS."*

---

## 4. Basic Accessibility — alt text, labels, aria-label

Keep this practical — just enough to answer "how would you make this accessible":

**Images** — always have `alt`, describing the content/purpose. Empty `alt=""` for purely decorative images (so screen readers skip them).
```html
<img src="chart.png" alt="Revenue grew 20% in Q3" />
<img src="decorative-line.png" alt="" />  <!-- decorative, skip it -->
```

**Form inputs** — always paired with a `<label>`, connected via `htmlFor`/`for` and `id`. Without this, a screen reader can't tell the user what the field is for.
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

**`aria-label`** — for when there's no visible text label but the element needs one (icon-only buttons are the classic case):
```tsx
<button aria-label="Close modal">
  <XIcon />
</button>
```

**Interview-ready:** *"At a basic level: images need descriptive `alt` text (empty for decorative ones), form inputs need an associated `<label>` via `htmlFor`/`id` so screen readers announce their purpose, and `aria-label` covers cases like icon-only buttons where there's no visible text for assistive tech to read."*

---
