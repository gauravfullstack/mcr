## 1) Read & Clarify (3–6 min) — Restating & clarifications I assume

Problem: Build a `/debounce` page with an input that calls a mocked/dummy API using debounced requests and shows results plus loading/empty/error states.

Assumptions / clarifying points (I’m making these to keep scope tight; this is what I'd state in an interview):

* Data size: small (≤100 items), so client-side rendering is fine.
* UI expectations: simple list of names, loading skeleton or spinner, empty state text, retry on error.
* Auth: none.
* Acceptance criteria:

  * Debounce delay: 300ms
  * Keyboard accessible input (focusable)
  * Cancel pending request if new query typed
  * Show loading indicator while request pending
  * Show “No results” when empty
  * Show error message and retry option on failure

## 2) High-level Design (3–5 min)

Components & state shape:

* `pages/DebouncePage.jsx` — page container
* `components/Input.jsx` — reusable controlled input
* `components/LoadingSpinner.jsx` — small spinner
* `components/ErrorMessage.jsx` — error UI + retry button
* `features/debounceSearch/useDebouncedSearch.js` — hook that accepts `query` and returns `{data, loading, error, retry}`
* `features/debounceSearch/api.js` — mock API (uses `setTimeout` to simulate network)
* `utils/debounce.js` — debounce util that returns a cancellable handler

State:

* `query` (string) in `DebouncePage`
* `useDebouncedSearch` internal state: `data`, `loading`, `error`, `controller` (for cancellation if using fetch — here we simulate)

Trade-offs:

* Using a mocked API keeps offline and repeatable tests easy.
* Simple caching is omitted to keep focus on debounce behaviour; caching is "nice-to-have".
* No external libs to keep repo minimal and interview-appropriate.

## 3) Plan & Timebox (1 min)

MVP (40–50m):

* Implement Input, debounce util, mock API, hook, page rendering results, loading/error/empty states, basic CSS.
  Nice-to-have extras:
* Keyboard navigation in list, result highlighting, simple in-memory cache.
